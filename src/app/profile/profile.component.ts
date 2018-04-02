import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { User } from 'firebase/app';
import { Profile } from '../shared/profile.model';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.user = data['user'];
      this.profile = data['profile'];
    });
  }

  updateGamertype(type: number) {
    if (this.profile.gamertype !== type) {
      this.profile.gamertype = type;
      this.userService.updateProfile(this.profile);
    }
  }


}
