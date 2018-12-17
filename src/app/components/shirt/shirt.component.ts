import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Shirt } from '../../shared/shirt';
import { ShoppingCartService } from '../../core/shopping-cart.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShirtSize } from '../../shared/shirt-size';
import { ShirtService } from '../../core/shirt.service';
import 'fabric';
import { CanvasScaler, CanvasScalerFactoryService } from '../../shared/canvas-scaler';

declare const fabric: any;

@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.component.html',
  styleUrls: ['./shirt.component.css']
})
export class ShirtComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentInit {

  @Input() shirt: Shirt;
  subs: Subscription[] = [];
  shirtSize = ShirtSize;

  open = false;
  direction = 'up';
  animationMode = 'fling';
  actionButtonsShown = false;
  canvas: fabric.Canvas;
  canvasScaler: CanvasScaler;
  @ViewChild('canvas') canvasElement: ElementRef;

  constructor(private shoppingCartService: ShoppingCartService,
    private shirtService: ShirtService,
    private router: Router,
    private element: ElementRef,
    private canvasScalerFactory: CanvasScalerFactoryService
  ) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.canvasScaler = this.canvasScalerFactory.createCanvasScaler(this.canvas, null, null, null);
    if (this.shirt.savedDesign && this.shirt.savedDesign.canvasJSON !== null) {
      if (!this.canvas) {
        this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
        this.canvas.setWidth(this.shirt.savedDesign.canvasWidth);
        this.canvas.setHeight(this.shirt.savedDesign.canvasHeight);
      }

      this.canvas.loadFromJSON(this.shirt.savedDesign.canvasJSON, () => {
        let img: fabric.Image = null;
        let txt: any = null;
        this.canvas.getObjects().forEach(obj => {
          obj.selectable = false;
          if (obj.type === 'image') {
            img = obj as fabric.Image;
          } else if (obj.type === 'textbox') {
            txt = obj;
          }

        });
        this.canvasScaler.currentImage = img;
        this.canvasScaler.currentTextbox = txt;
        this.canvasScaler.canvas = this.canvas;
        this.canvasScaler.adjustCanvasAndObjectsSize(this.canvasElement.nativeElement.parentElement.clientWidth,
           this.canvasElement.nativeElement.parentElement.clientHeight);
        this.canvas.renderAll();
      });
    }
  }

  ngAfterViewChecked() {
    // this.canvasScaler.adjustCanvasAndObjectsSize(this.canvasElement.nativeElement.parentElement.clientWidth,
    // this.canvasElement.nativeElement.parentElement.clientHeight);
  }

  ngOnDestroy(): any {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
    this.subs = [];
  }

  renderImage(image) {
    return '../../../assets/images/image';
  }

  addToBasket(shirt: Shirt, size: ShirtSize): any {
    this.shoppingCartService.addToShoppingCart(shirt, size);
  }

  edit() {

  }

  duplicate(shirt: Shirt) {
    this.shirtService.duplicateShirt(shirt);
  }

  delete(shirt: Shirt): void {
    this.shirtService.deleteShirt(shirt);
  }

  getStyleImagePath(shirt: Shirt): string {
    return this.shirtService.getStyleImagePath(shirt);
  }
}
