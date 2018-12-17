import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Shirt } from '../../shared/shirt';
import { ShoppingItem } from '../../shared/shopping-item';
import { ShoppingCartService } from '../../core/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SlidingPanelsService } from '../../core/sliding-panels.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCartItems: ShoppingItem[];
  subscription: Subscription;
  subtotal: number;
  shoppingCartForm: FormGroup;

  constructor(private shoppingCartService: ShoppingCartService,
              private slidingPanelsService: SlidingPanelsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.subtotal = 0;
    this.subscription = this.shoppingCartService.getShoppingCartItems().subscribe((items) => {
      this.shoppingCartItems = items;
      this.subtotal = this.shoppingCartService.calculateSubtotal();
    });
    this.shoppingCartForm = this.fb.group({
      shoppingItems: this.fb.array([

      ])
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeQuantity(item: ShoppingItem): any {
    this.subtotal = this.shoppingCartService.calculateSubtotal();
  }

  closeShoppingCart(): any {
    this.slidingPanelsService.toggleShoppingCart(false);
  }

  goToShipping(): void {
    this.slidingPanelsService.toggleShippingInfo(true);
  }
  removeItem(formGroup): void {
    const formItems = this.shoppingCartForm.get('shoppingItems') as FormArray;
    const index = formItems.controls.findIndex(f => f === formGroup);
    formItems.removeAt(index);
  }
  formInitialized(name: string, form: FormGroup) {
    const items = this.shoppingCartForm.get('shoppingItems') as FormArray;
    items.push(form);
  }
}
