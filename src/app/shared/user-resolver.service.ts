import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Resolve } from '@angular/router';
import { User } from 'firebase/app';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getCurrentUser();
  }
}
