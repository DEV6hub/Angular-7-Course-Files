import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Shirt } from '../../shared/shirt';
import { ShoppingItem } from '../../shared/shopping-item';
import { ShirtSize } from '../../shared/shirt-size';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../core/shopping-cart.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CanvasScaler, CanvasScalerFactoryService } from '../../shared/canvas-scaler';
import 'fabric';
import { ShirtService } from '../../core/shirt.service';

declare const fabric: any;
const TIMES_PATH = '../../../assets/images/icon-times.svg';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit, AfterContentInit {

  @Input() item: ShoppingItem;
  @Input() shoppingCartFormItems: FormArray;
  @Output() quantityChange = new EventEmitter();
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() removeItem = new EventEmitter<FormGroup>();
  shoppingItemForm: FormGroup;
  canvas: fabric.Canvas;
  canvasScaler: CanvasScaler;
  @ViewChild('canvas') canvasElement: ElementRef;

  timesImagePath: string = TIMES_PATH;

  constructor(private shoppingCartService: ShoppingCartService,
    private fb: FormBuilder,
    private canvasScalerFactory: CanvasScalerFactoryService,
    private shirtService: ShirtService) { }

  ngOnInit() {
    this.shoppingItemForm = this.fb.group({
      size: new FormControl(this.item.size, [Validators.required]),
      quantity: new FormControl(this.item.quantity, [Validators.required])
    });
    this.formReady.emit(this.shoppingItemForm);
  }

  ngAfterContentInit() {
    this.canvasScaler = this.canvasScalerFactory.createCanvasScaler(this.canvas, null, null, null);
    const shirt = this.item.shirt;
    if (shirt.savedDesign && shirt.savedDesign.canvasJSON !== null) {
      if (!this.canvas) {
        this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
        this.canvas.setWidth(shirt.savedDesign.canvasWidth);
        this.canvas.setHeight(shirt.savedDesign.canvasHeight);
      }

      this.canvas.loadFromJSON(shirt.savedDesign.canvasJSON, () => {
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

  changeQuantity(q) {
    this.item.quantity = q;
    this.quantityChange.emit(this.item);
  }

  removeCartItem(item: ShoppingItem): any {
    this.shoppingCartService.removeFromShoppingCart(item);
    this.removeItem.emit(this.shoppingItemForm);
  }

  getStyleImagePath(shirt: Shirt): string {
    return this.shirtService.getStyleImagePath(shirt);
  }

}
