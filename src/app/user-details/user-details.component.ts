interface IHob  {
hobName: string;
select: boolean;
}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/patterns';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { nanoid } from "nanoid";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent  {

  userForm: FormGroup;
  hobbies:IHob[] = [
    {
      hobName:'Drawing', 
      select:false
    },
    {
      hobName:'Singing',
      select:false
    },
    {
      hobName:'Cooking',
      select: false
    },
    {
      hobName:'Reading',
      select: false
    },
  ];
  genders:string[] = ['Male','Female'];
  id: string;
  selectedHobbies:string[] = [];
  userDetails: User[];
  user: User;
  
 
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'uname': new FormControl(null, [Validators.required,Validators.pattern(Regex.Name)]),
      'email': new FormControl(null, [Validators.required, Validators.pattern(Regex.Email)]),
      'date': new FormControl(null, Validators.required),
      'contact': new FormControl(null, [Validators.required,Validators.pattern(Regex.Contact)]),
      'education': new FormControl(null, [Validators.required,Validators.pattern(Regex.Education)]),
      'percent': new FormControl(null, [Validators.required,Validators.pattern(Regex.Percent)]),
      'school': new FormControl(null, [Validators.required,Validators.pattern(Regex.School)]),
      'gender': new FormControl(null, Validators.required),
      'address': new FormControl(null),
      'summary': new FormControl(null),
      'hobby':new FormArray([]),
    });

     
    
      this.id = this.route.snapshot.params.id;


      if(!this.id){
        for(let i=0; i<this.hobbies.length; i++){
          const getControls = this.userForm.get('hobby') as FormArray;
          getControls.push(new FormControl(false));
        }
      }else{
        this.userService.getUser(this.id).subscribe(
          res => {
            this.user = res;
            this.initForm(this.id);  
            for(let i=0; i<this.hobbies.length; i++){
              const getControls = this.userForm.get('hobby') as FormArray;
              if(this.user.selected.includes(this.hobbies[i].hobName)){
                getControls.push(new FormControl(true));
              }
              else{
                getControls.push(new FormControl(false));
              }
            }
          });
        }
  }

    
    onFormSubmit(){
      this.onChange();
      let selected = this.selectedHobbies;
      if(!this.id){
       this.userService.postUsers({...this.userForm.value,selected,id: nanoid(6)}).subscribe(
        res => {
          this.router.navigate(['/showdetails']);
       });
      }
      else{
        this.userService.updateUser(this.id,{...this.userForm.value,selected,id:this.id}).subscribe(
          res => {
              this.router.navigate(['/showdetails']);
          });
      }
    }


    onChange(){
      const hobbiesArray = this.userForm.get('hobby') as FormArray;
      hobbiesArray.controls.forEach((ele,i) => {
        if(ele.value){
          this.hobbies[i].select = !this.hobbies[i].select;
          this.selectedHobbies.push(this.hobbies[i].hobName);
        }
      })
    }
    

    private initForm(id: string){
      this.userForm.patchValue({
        'uname': this.user.uname,
        'email': this.user.email,
        'date': this.user.date,
        'contact': this.user.contact,
        'education': this.user.education,
        'percent': this.user.percent,
        'school': this.user.school,
        'gender': this.user.gender,
        'address': this.user.address,
        'summary': this.user.summary,
      });
    } 
}

