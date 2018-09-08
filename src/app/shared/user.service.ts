import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';
import { Router } from '@angular/router';
import { Profile } from './profile.model';
import { Subject } from 'rxjs';


@Injectable()
export class UserService {


  user: Observable<User>;

  constructor(private fauth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router) {
    this.user = fauth.authState;
    this.user.subscribe((user) => {
      //
    });
  }

  login(): void {
    this.fauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((p) => {
      this.loadProfile(p.user).then((profile) => {
        profile.lastSignin = profile.signin ? profile.signin : null;
        profile.signin = new Date();
        this.store.doc<Profile>(`users/${p.user.uid}`).update({ ...profile });
      });
    });
  }

  async logout() {
    // first update doc, since we are not allowed afterwards...
    const signout = new Date();
    try {
      await this.store.doc<Profile>(`users/${this.fauth.auth.currentUser.uid}`).update({ 'signout': signout });
    } catch (error) {
      console.error('Could not update user document!', error);
    }
    await this.fauth.auth.signOut();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.fauth.auth.currentUser !== null;
  }

  getCurrentUser(): User {
    return this.fauth.auth.currentUser;
  }

  getCurrentProfile(): Promise<Profile> {
    return this.loadProfile(this.fauth.auth.currentUser);
  }

  updateProfile(profile: Profile) {
    this.store.doc<Profile>(`users/${this.getCurrentUser().uid}`).set({ ...profile });
  }

  private loadProfile(user: User): Promise<Profile> {
    console.log('user:', user.uid);
    return new Promise<Profile>((res, rej) => {
      const profileDoc: AngularFirestoreDocument<Profile> = this.store.doc<Profile>(`users/${user.uid}`);
      this.createDocIfNecessary(profileDoc).then((profile) => {
        res(profile);
      });
    });
  }


  private createDocIfNecessary(doc: AngularFirestoreDocument<Profile>): Promise<Profile> {
    return new Promise<Profile>((res, rej) => {
      doc.ref.get().then((d) => {
        if (!d.exists) {
          const p = new Profile();
          p.email = this.getCurrentUser().email;
          p.displayName = this.getCurrentUser().displayName;
          p.userid = this.getCurrentUser().uid;
          p.gamertype = Profile.GAMERTYPE_MIXED;
          doc.set({ ...p }).then(() => res(p));
        } else {
          const profile = { ...d.data() } as Profile;
          if (!profile.gamertype) {
            profile.gamertype = Profile.GAMERTYPE_MIXED;
          }
          res(profile);
        }
      });
    });
  }
}
