import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { SlidingPanelsService } from '../../core/sliding-panels.service';
import { UserInfo } from '../../shared/user-info';
import { UserInfoService } from '../../core/user-info.service';
import { Subscription, Observable} from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {
  private subscription: Subscription;
  private states = REGIONS;
  private countries = COUNTRIES;
  @ViewChild('f') form: any;
  model: UserInfo = new UserInfo({});
  selectedCountry = 'Select Option';
  selectedState = 'Select';

  constructor( private router: Router, private slidingPanelsService: SlidingPanelsService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.model = this.userInfoService.userInfo;
  }

  selectCountry(country) {
    this.selectedCountry = country;
    this.selectedState = 'Select';
  }

  selectState(state) {
    this.selectedState = state;
  }

  goToPayment(): void {
    if (this.form.valid) {
    this.slidingPanelsService.togglePaymentMethod(true);
    }
  }
  reset() {
    this.form.reset();
    window.alert('All fields are cleared up.');
  }
}
