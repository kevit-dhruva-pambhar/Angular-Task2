import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/patterns';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  typeName: string = 'password';

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'loginEmail': new FormControl(null, [Validators.required, Validators.pattern(Regex.Email)]),
      'loginPassword': new FormControl(null,[Validators.required, Validators.pattern(Regex.Password)])
    })
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.typeName = this.showPassword ? 'text' : 'password';
  }
}



