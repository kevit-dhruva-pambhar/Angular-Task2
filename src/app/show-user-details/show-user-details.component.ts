import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent implements OnInit {
  user: User;
  details: User[];
  key: string;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
             ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.details = this.userService.details;
    this.key = this.userService.userId;
  }  

} 
