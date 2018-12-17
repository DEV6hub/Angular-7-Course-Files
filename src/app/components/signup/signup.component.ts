import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() formType: string;

  @Output() signupSuccess = new EventEmitter();



  termsOfUse = 'By clicking the Sign Up button below, you agree to our Terms of Service and Privacy Policy.';
  constructor() { }

  ngOnInit() {
  }

  signup() {
    this.signupSuccess.emit(true);
  }

  navigateToContactInfo() {
  }

}
