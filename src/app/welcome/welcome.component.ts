import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: User;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.subscription = this.userService.user.subscribe((user) => {
      this.user = user;
      console.log(JSON.stringify(user));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onLogin() {
    this.userService.login();
  }

  onLogout() {
    this.userService.logout();
  }
}
