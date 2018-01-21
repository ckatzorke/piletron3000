import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  constructor(private fauth: AngularFireAuth) { }

  ngOnInit() {
    console.log(this.fauth.authState);
  }

  onLogin() {
    this.fauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  onLogout() {
    this.fauth.auth.signOut();
  }

}
