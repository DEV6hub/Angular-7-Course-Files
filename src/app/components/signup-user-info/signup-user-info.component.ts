import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { Router } from '@angular/router';
import { UserInfo } from '../../shared/user-info';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserInfoService } from '../../core/user-info.service';

@Component({
  selector: 'app-signup-user-info',
  templateUrl: './signup-user-info.component.html',
  styleUrls: ['./signup-user-info.component.css']
  //encapsulation: ViewEncapsulation.None
})
export class SignupUserInfoComponent implements OnInit {
  userInfoForm: FormGroup;
  private states = REGIONS;
  private countries = COUNTRIES;
  selectedCountry = 'Select Option';
  selectedState = 'Select';
  contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';
  userInfo: UserInfo;

  constructor(private router: Router, private fb: FormBuilder, private userInfoService: UserInfoService) {

     }

  ngOnInit() {
    this.userInfoForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      postal: new FormControl('', [Validators.required]),
    });
  }

  selectCountry(country) {
    this.selectedCountry = country;
    this.selectedState = 'Select';
  }

  selectState(state) {
    this.selectedState = state;
  }

  save(userInfo) {
    if (this.userInfoForm.valid) {
      this.userInfoService.addUser(userInfo);
      this.router.navigateByUrl('/catalog');
    } else {
      window.alert('Please fill up enitre form correctly before pressing Save button.');
    }
  }
}
