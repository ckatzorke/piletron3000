import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { UserService } from '../shared/user.service';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  usersubscription: Subscription;
  profilesubscription: Subscription;
  profile: Profile;

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.profilesubscription = this.userService.profile.subscribe((p) => { this.profile = p; });

    //this.profile = await this.userService.getCurrentProfile();
    //console.log("welcome profile", this.profile);
  }

  ngOnDestroy() {
    this.profilesubscription.unsubscribe();
  }

  onLogin() {
    this.userService.login();
  }

  onLogout() {
    this.userService.logout();
  }
}
