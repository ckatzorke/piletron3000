import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  profile: Profile;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.userService.user.subscribe((user) => {
      if (user) {
        this.userService.getCurrentProfile().then((p) => this.profile = p);
      } else {
        this.profile = null;
      }
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
