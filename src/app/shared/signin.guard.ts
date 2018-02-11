import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class SigninGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }
  }
}
