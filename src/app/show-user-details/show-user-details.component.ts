import { Component, OnInit} from '@angular/core';
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
  userDetails: User[];
  showUserInfo: boolean = false;
  
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllUsers();
  }  

  delete(userdetail: any){
    this.userService.deleteUser(userdetail.id).subscribe(
      (res) => {
        alert('User Deleted')
        this.getAllUsers();
        this.showUserInfo = false;
      }
    );
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.userDetails = res;
      });
  }

  
  getuser(id: string){
    this.userService.getUser(id).subscribe(
        res => {
          this.showUserInfo = true;
          this.router.navigate([id],{relativeTo: this.route});
          this.user = res;
        });
  }
 
}


