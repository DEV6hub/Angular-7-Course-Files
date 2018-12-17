import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ShoppingCartService } from '../../core/shopping-cart.service';

const SHIRT_ICON = '../../../assets/images/ShirtIcon.svg';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.css']
})
export class PaymentCompleteComponent implements OnInit {

  @Output() close;
  shirtIconPath = SHIRT_ICON;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.close = new EventEmitter();  
  }

  ngOnInit() {
  }

  goToCatalog(): void {
    this.shoppingCartService.clearShoppingCart();
    this.close.emit();
  }

}
