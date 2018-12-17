import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SlidingPanelsService {

    private _shoppingCartToggle = new BehaviorSubject<boolean>(false);
    private _shippingInfoToggle = new BehaviorSubject<boolean>(false);
    private _paymentMethodToggle = new BehaviorSubject<boolean>(false);

    shoppingCart$ = this._shoppingCartToggle.asObservable();
    shippingInfo$ = this._shippingInfoToggle.asObservable();
    paymentMethod$ = this._paymentMethodToggle.asObservable();

    toggleShoppingCart(state: boolean) {
        this._shoppingCartToggle.next(state);
    }

    toggleShippingInfo(state: boolean) {
        this._shippingInfoToggle.next(state);
    }

    togglePaymentMethod(state: boolean) {
        this._paymentMethodToggle.next(state);
    }
}