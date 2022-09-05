interface IHob  {
hobName: string;
select: boolean;
}
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from 'src/patterns';
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

 
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

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
      if(this.id == null){
        for(let i=0; i<this.hobbies.length; i++){
          const getControls = this.userForm.get('hobby') as FormArray;
          getControls.push(new FormControl(false));
        }
      }else{
        var getid = this.userService.details.findIndex(p => p['uid'] === this.id);
        for(let i=0; i<this.hobbies.length; i++){
          const getControls = this.userForm.get('hobby') as FormArray;
          if(this.userService.details[getid].selected.includes(this.hobbies[i].hobName)){
            getControls.push(new FormControl(true));
          }
          else{
            getControls.push(new FormControl(false));
          }
        }
      }

      if(this.id!=null){
        this.initForm(this.id);
      }
  }

    
    onFormSubmit(){
      this.onChange();
      let selected = this.selectedHobbies;
      if(!this.id){
       this.router.navigate(['/showdetails']);
       this.userService.details.push({...this.userForm.value,selected,uid:this.userService.userId});
      }
      else{
        var ind = this.userService.details.findIndex(p => p['uid'] === this.id);
        this.userService.details[ind] = {...this.userForm.value,selected,uid:this.userService.userId};
        this.router.navigate(['/showdetails']);
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
      var index = this.userService.details.findIndex(p => p['uid'] === id);
      this.userForm.patchValue({
        'uname': this.userService.details[index].uname,
        'email': this.userService.details[index].email,
        'date': this.userService.details[index].date,
        'contact': this.userService.details[index].contact,
        'education': this.userService.details[index].education,
        'percent': this.userService.details[index].percent,
        'school': this.userService.details[index].school,
        'gender': this.userService.details[index].gender,
        'address': this.userService.details[index].address,
        'summary': this.userService.details[index].summary,
      });
    } 
}

