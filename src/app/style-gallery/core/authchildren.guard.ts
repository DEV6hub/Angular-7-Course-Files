import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../core/shopping-cart.service';

@Injectable()
export class AuthchildrenGuard implements CanActivateChild {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.shoppingCartService.itemsInBasket) {
      return true;
    } else {
      window.alert('You need to add shirt in basket in order to view style options.');
      this.router.navigateByUrl('/catalog');
      return false;
    }
  }
}
