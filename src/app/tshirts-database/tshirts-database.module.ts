import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TshirtsDbComponent } from './tshirts-db/tshirts-db.component';

const routes: Routes = [
  {
    path: '',
    component: TshirtsDbComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TshirtsDbComponent]
})
export class TShirtsDatabaseModule { }
