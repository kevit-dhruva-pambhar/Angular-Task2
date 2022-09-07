import { Component, OnInit} from '@angular/core';
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
  clicked: boolean = false;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.details = this.userService.details;
    this.key = this.userService.userId;
    this.getAllUsers();
  }  

  delete(detail: any){
    this.userService.deleteUser(detail.id).subscribe(
      (res) => {
        alert('User Deleted')
        this.getAllUsers();
        this.clicked = false;
      }
    );
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.details = res;
      });
  }

  
  getuser(id: number){
    this.clicked = true;
    this.userService.getUser(id).subscribe(
        res => {
          this.user = res;
        });
  }
 
}


