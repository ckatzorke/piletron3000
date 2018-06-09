import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';


@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> | Promise<Profile> | Profile {
    return this.userService.getCurrentProfile();
  }
}
