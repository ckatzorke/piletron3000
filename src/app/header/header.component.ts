import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  burger = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  toggleBurger() {
    this.burger = !this.burger;
  }

  onLogout() {
    this.userService.logout();
  }

}
