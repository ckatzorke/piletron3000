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
  user: User;

  constructor(private userService: UserService) {
    this.usersubscription = this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  async ngOnInit() {
  }

  ngOnDestroy() {
    this.usersubscription.unsubscribe();
  }

  onLogin() {
    this.userService.login();
  }

}
