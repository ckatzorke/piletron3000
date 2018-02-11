import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from 'firebase/app';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  user: User;

  constructor(private userService: UserService) { }

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
