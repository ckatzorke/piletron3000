import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

  user: Observable<User>;

  constructor(private fauth: AngularFireAuth, private router: Router) {
    this.user = fauth.authState;
  }

  login(): void {
    this.fauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.fauth.auth.signOut().then(() => this.router.navigate(['/home']));
  }

  isLoggedIn(): boolean {
    return this.fauth.auth.currentUser !== null;
  }

  getCurrentUser(): User {
    return this.fauth.auth.currentUser;
  }

}
