import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from 'firebase/app';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.userService.logout();
  }
}
