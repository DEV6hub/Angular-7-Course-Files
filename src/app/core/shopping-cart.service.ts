import { Injectable } from '@angular/core';
import { ShoppingItem } from '../shared/shopping-item';
import { ShirtService } from '../core/shirt.service';
import { Shirt } from '../shared/shirt';
import { ShirtSize } from '../shared/shirt-size';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ShoppingCartService {
    private shoppingItems: ShoppingItem[] = [];
    itemsInBasket = false;
    private _shoppingItemsSubject: BehaviorSubject<ShoppingItem[]>  = new BehaviorSubject<ShoppingItem[]>([]);
    private lastUsedId: number;

    constructor(private shirtService: ShirtService) {

    }

    private setShoppingCartItems() {
        this._shoppingItemsSubject.next(this.shoppingItems);
    }

    getShoppingCartItems(): Observable<ShoppingItem[]> {
        // if (!this._shoppingItemsSubject) {
        //     this._shoppingItemsSubject = [];

        //     const shirts: Shirt[] = this.shirtService.getShoppingCartShirts();
        //     for (const shirt of shirts) {
        //         this._shoppingItemsSubject.push(new ShoppingItem(shirt, 1, ShirtSize.Small));
        //     }
        // }
        // return Observable.from(this.shoppingItems);
        return this._shoppingItemsSubject.asObservable();
    }

    addToShoppingCart(shirt: Shirt, shirtSize: ShirtSize): any {
        const quantity = 1; // default quantity
        this.itemsInBasket = true;
        if (!this.shoppingItems) {
            this.shoppingItems = [];
        }

        if (!this.lastUsedId) {
            this.lastUsedId = 0;
        }

        // check if this exact shirt with the same size
        // already added to shopping cart, increment quantity if yes
        let idx: number = this.shoppingItems.findIndex(si => si.shirt.id === shirt.id && si.size === shirtSize);
        if (idx !== -1) {
            this.shoppingItems[idx].quantity++;
        } else {
            const shoppingItem: ShoppingItem = new ShoppingItem(++this.lastUsedId, shirt, quantity, shirtSize);
            this.shoppingItems.push(shoppingItem);
        }
        this.setShoppingCartItems();

        // return new Observable<ShoppingItem>((observer) => {
        //     if (!this.shoppingItems) {
        //         this.shoppingItems = [];
        //     }
        //     const shoppingItem: ShoppingItem = new ShoppingItem(shirt, quantity, size);
        //     this.shoppingItems.push(shoppingItem);
        //     observer.next(shoppingItem);
        //     observer.complete();
        // });
    }

    removeFromShoppingCart(item: ShoppingItem): any {
        let idx: number = this.shoppingItems.findIndex(si => si.id === item.id);
        if (idx !== -1) {
            this.shoppingItems.splice(idx, 1);
            this.setShoppingCartItems();
        }
    }

    clearShoppingCart(): void {
        this.shoppingItems = [];
        this.setShoppingCartItems();
    }

    calculateSubtotal(): number {
        return this.shoppingItems.reduce((total, item) => total + item.shirt.price * item.quantity, 0);
    }
    checkBasketStatus(): boolean {
        return this.itemsInBasket;
    }
}
