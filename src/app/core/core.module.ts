import { NgModule } from '@angular/core';
import { ShirtService } from './shirt.service';
import { ShoppingCartService } from './shopping-cart.service';
import { SlidingPanelsService } from './sliding-panels.service';

@NgModule({
    providers: [ShirtService, ShoppingCartService, SlidingPanelsService]
})
export class CoreModule {}
