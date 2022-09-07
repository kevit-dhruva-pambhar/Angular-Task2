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

     
      this.userDetails = this.userService.details;
      this.id = this.route.snapshot.params.id;


      if(this.id == null){
        for(let i=0; i<this.hobbies.length; i++){
          const getControls = this.userForm.get('hobby') as FormArray;
          getControls.push(new FormControl(false));
        }
      }else{
        this.userService.getUsers().subscribe(
          res => {
            this.userDetails = res;
            this.initForm(this.id);  
            var getid = this.userDetails.findIndex(p => p['uid'] === this.id);
            for(let i=0; i<this.hobbies.length; i++){
              const getControls = this.userForm.get('hobby') as FormArray;
              if(this.userDetails[getid].selected.includes(this.hobbies[i].hobName)){
                getControls.push(new FormControl(true));
              }
              else{
                getControls.push(new FormControl(false));
              }
            }
          }
        );
      }
  }

    
    onFormSubmit(){
      this.onChange();
      let selected = this.selectedHobbies;
      if(!this.id){
       this.router.navigate(['/showdetails']);
       this.userDetails.push({...this.userForm.value,selected,uid:this.userService.userId});
       this.userService.postUsers({...this.userForm.value,selected,uid:this.userService.userId});
      }
      else{
        var ind = this.userDetails.findIndex(p => p['uid'] === this.id);
        var editId = this.userDetails[ind].id;
        this.router.navigate(['/showdetails']);
        this.userDetails[ind] = {...this.userForm.value,selected,uid:this.userService.userId};
        this.userService.updateUser(editId,{...this.userForm.value,selected,uid:this.userService.userId});
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
      var index = this.userDetails.findIndex(p => p['uid'] === id);
      this.userForm.patchValue({
        'uname': this.userDetails[index].uname,
        'email': this.userDetails[index].email,
        'date': this.userDetails[index].date,
        'contact': this.userDetails[index].contact,
        'education': this.userDetails[index].education,
        'percent': this.userDetails[index].percent,
        'school': this.userDetails[index].school,
        'gender': this.userDetails[index].gender,
        'address': this.userDetails[index].address,
        'summary': this.userDetails[index].summary,
      });
    } 
}

