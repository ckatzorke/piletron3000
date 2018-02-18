import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { Router } from '@angular/router';
import { Profile } from './profile.model';


@Injectable()
export class UserService {

  user: Observable<User>;
  private profileDoc: AngularFirestoreDocument<Profile>;
  profile: Observable<Profile>;
  private profileData: Profile;

  constructor(private fauth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router) {
    this.user = fauth.authState;
    this.user.subscribe(() => {
      if (this.isLoggedIn()) {
        this.loadProfile(this.getCurrentUser().email);
      }
    });
  }

  login(): void {
    this.fauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((p) => {
      this.loadProfile(p.user.email).then(() => {
        this.profileData.lastSignin = this.profileData.signin ? this.profileData.signin : null;
        this.profileData.signin = new Date();
        this.profileDoc.update(this.profileData);
      });
    });
  }

  logout(): void {
    this.fauth.auth.signOut().then(() => {
      this.profileData.signout = new Date();
      this.profileDoc.update(this.profileData).then(() => {
        this.profileData = null;
        this.router.navigate(['/home']);
      });
    });
  }

  isLoggedIn(): boolean {
    return this.fauth.auth.currentUser !== null;
  }

  getCurrentUser(): User {
    return this.fauth.auth.currentUser;
  }

  getCurrentProfile(): Promise<Profile> {
    return this.loadProfile(this.fauth.auth.currentUser.email);
  }

  private loadProfile(email: String): Promise<Profile> {
    const promise = new Promise<Profile>((res, rej) => {
      this.profileDoc = this.store.doc<Profile>(`users/${email}`);
      this.createDocIfNecessary(this.profileDoc).then(() => {
        this.profile = this.profileDoc.valueChanges();
        this.profile.subscribe((data) => {
          this.profileData = data;
          res(data);
        });
      });
    });
    return promise;

  }

  private async createDocIfNecessary(doc: AngularFirestoreDocument<Profile>): Promise<void> {
    const promise = new Promise<void>((res, rej) => {
      doc.ref.get().then((d) => {
        if (!d.exists) {
          const p = new Profile();
          p.email = this.getCurrentUser().email;
          p.displayName = this.getCurrentUser().displayName;
          doc.set({ ...p }).then(() => res());
        } else {
          res();
        }
      });
    });
    return promise;
  }
}
