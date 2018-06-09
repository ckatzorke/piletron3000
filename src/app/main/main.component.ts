import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe((user) => this.user = user);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogin() {
    this.userService.login();
  }

}
