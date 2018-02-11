import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';
import { ActivatedRoute, Data } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.user = data['user'];
    });
  }


}
