import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { PaymentInfo } from '../../shared/payment-info';
import { ShoppingCartService } from '../../core/shopping-cart.service';
import { SlidingPanelsService } from '../../core/sliding-panels.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

const SHIPPING_PRICE = 9.99;
const TAX_PERCENTAGE = 0.13;

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  @Output() checkedOut;
  sub: Subscription;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  model: PaymentInfo = new PaymentInfo();
  @ViewChild('paymentForm') form: any;

  constructor(private shoppingCartService: ShoppingCartService,
    private slidingPanelsService: SlidingPanelsService) {
    this.checkedOut = new EventEmitter();
  }

  ngOnInit() {
    this.sub = this.slidingPanelsService.paymentMethod$.subscribe((state) => {
      if (state) {
        this.calculatePrices();
      }
    });
  }

  checkout(): void {
    if (this.form.valid) {
      this.checkedOut.emit();
    }
  }

  private calculatePrices(): void {
    this.shipping = SHIPPING_PRICE;
    this.subtotal = this.shoppingCartService.calculateSubtotal();
    this.tax = this.subtotal * TAX_PERCENTAGE;
    this.total = this.subtotal + this.shipping + this.tax;
  }

}
