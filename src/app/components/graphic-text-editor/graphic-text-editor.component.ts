import { Component, ElementRef, Input, Output, EventEmitter, AfterViewChecked, Renderer2, ViewChild, AfterContentInit } from '@angular/core';
import 'fabric';
import { ShirtService } from '../../core/shirt.service';
import { CanvasScaler, CanvasScalerFactoryService } from '../../shared/canvas-scaler';
import { IText } from 'fabric/fabric-impl';
declare const fabric: any;

const TIMES_PATH = "../../../assets/images/icon-times.svg";

@Component({
  selector: 'app-graphic-text-editor',
  templateUrl: './graphic-text-editor.component.html',
  styleUrls: ['./graphic-text-editor.component.css']
})
export class GraphicTextEditorComponent implements AfterViewChecked, AfterContentInit {

  private canvas: fabric.Canvas;
  private _currentImage: fabric.Image;
  private _currentTextbox: any;
  private _currentCloseButton: any;
  private _inputText: string;
  private _fontFamily: string;
  private _textColour: string;
  private _imageUrl: string;
  private canvasScaler: CanvasScaler; 

  @ViewChild('canvas') canvasElement: ElementRef;

  set currentImage(value: fabric.Image) {
    this._currentImage = value;
    this.canvasScaler.currentImage = this._currentImage;
  }

  set currentTextbox(value: any) {
    this._currentTextbox = value;
    this.canvasScaler.currentTextbox = this._currentTextbox;
  }

  set currentCloseButton(value: any) {
    this._currentCloseButton = value;
    this.canvasScaler.currentCloseButton = this._currentCloseButton;
  }

  get currentImage(): fabric.Image {
    return this._currentImage;
  }

  get currentTextbox(): any {
    return this._currentTextbox;
  }

  get currentCloseButton(): any {
    return this._currentCloseButton;
  }

  @Input()
  set imageUrl(value: string) {
    this._imageUrl = value;
    this.loadImage();
  }

  @Output() inputTextChange = new EventEmitter();

  set inputText(value: string) {
    this._inputText = value;
    this.inputTextChange.emit(this._inputText);
    this.loadText();
  }
  @Input()
  set fontFamily(value: string) {
    this._fontFamily = value;
    this.loadText();
  }
  @Input()
  set textColour(value: string) {
    this._textColour = value;
    this.loadText();
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  @Input()
  get inputText(): string {
    return this._inputText;
  }

  get fontFamily(): string {
    return this._fontFamily;
  }

  get textColour(): string {
    return this._textColour;
  }

  constructor(private element: ElementRef, private renderer: Renderer2, private shirtService: ShirtService, private canvasScalerFactory: CanvasScalerFactoryService) {
  }

  ngAfterContentInit() {
    this.canvasScaler = this.canvasScalerFactory.createCanvasScaler(this.canvas, this.currentImage, this.currentTextbox, this.currentCloseButton);  
  }

  ngAfterViewChecked() {
    this.canvasScaler.adjustCanvasAndObjectsSize(this.element.nativeElement.parentElement.clientWidth, this.element.nativeElement.parentElement.clientHeight);
  }

  private loadCanvas(): void {
    if (!this.canvas) {
      this.canvas = new fabric.Canvas('canvas', {
        width: this.element.nativeElement.parentElement.clientWidth,
        height: this.element.nativeElement.parentElement.clientHeight
      });
    }
    this.rebindCanvasEvents();
    this.shirtService.setDesignCanvas(this.canvas);
  }

  private rebindCanvasEvents(): void {
    this.canvas.off('object:scaling');
    this.canvas.on('object:scaling', (e) => {
      this.removeCloseButton();
    });

    this.canvas.off('object:moving');
    this.canvas.on('object:moving', (e) => {
      this.removeCloseButton();
    });

    this.canvas.off('object:scaled');
    this.canvas.on('object:scaled', (e) => {
      this.addCloseButton(e.target.aCoords.tr.x, e.target.aCoords.tr.y);
    });

    this.canvas.off('object:moved');
    this.canvas.on('object:moved', (e) => {
      this.addCloseButton(e.target.aCoords.tr.x, e.target.aCoords.tr.y);
    });

    this.canvas.off('mouse:down');
    this.canvas.on('mouse:down', (e) => {
      if (!this.canvas.getActiveObject()) {
        this.removeCloseButton();
      }
      if (this.canvas.getActiveObject() !== this.currentCloseButton) {
        this.removeCloseButton();
        this.addCloseButton(e.target.aCoords.tr.x, e.target.aCoords.tr.y);
      }
    });

    this.canvas.off('object:selected');
    this.canvas.on('object:selected', (e) => {
      this.addCloseButton(e.target.aCoords.tr.x, e.target.aCoords.tr.y);
    });
  }

  public loadImage(imgUrl?: string): void {
    const imgUrlToUse = imgUrl || this.imageUrl;
    console.log(imgUrlToUse);

    if (!imgUrlToUse || imgUrlToUse === '') {
      return;
    }

    this.loadCanvas();

    if (this.currentImage) {
      this.currentImage.setSrc(imgUrlToUse, (img) => {
        this.canvasScaler.rescaleImage(img);
        this.currentImage = img;
        this.canvas.setActiveObject(img);
        this.canvas.renderAll();
      });
    }
    else {

      new fabric.Image.fromURL(imgUrlToUse, (img) => {
        let oImg = img.set({
          top: 50,
          borderColor: '#e842f4',
          cornerColor: '#e842f4',
          cornerSize: 10,
          cornerStyle: 'circle',
          transparentCorners: false,
          hasRotatingPoint: false,
          centeredScaling: true
        });
        oImg.scaleToWidth(this.canvas.getWidth() - 20);
        this.currentImage = oImg;
        this.canvas.add(oImg);
        this.canvas.centerObjectH(oImg);
        this.canvas.setActiveObject(oImg);
        this.canvas.renderAll();
      });
    }
  }

  loadText(): void {

    if (!this.inputText || this.inputText === '') {
      return;
    }

    this.loadCanvas();

    if (this.currentTextbox) {
      if (this.inputText) {
        this.currentTextbox.set('text', this.inputText);
      }

      if (this.fontFamily) {
        this.currentTextbox.set('fontFamily', this.fontFamily);
      }

      if (this.textColour) {
        this.currentTextbox.set('fill', this.textColour);
      }
      this.canvasScaler.rescaleText(this.currentTextbox);
      this.canvas.setActiveObject(this.currentTextbox);
      this.canvas.renderAll();

    } else {

      this.currentTextbox = new fabric.Textbox(this.inputText, {
        top: 50,
        width: this.canvas.getWidth() - 20,
        fontSize: 68,
        textAlign: 'center',
        borderColor: '#e842f4',
        cornerColor: '#e842f4',
        cornerSize: 10,
        cornerStyle: 'circle',
        transparentCorners: false,
        hasRotatingPoint: false
      });
      //this.addCloseButton(50, 50);
      //this.currentTextbox.setControlsVisibility(this.hideControls);
      this.canvas.add(this.currentTextbox);
      this.canvas.centerObjectH(this.currentTextbox);
      this.canvas.setActiveObject(this.currentTextbox);
      this.canvas.renderAll();

      this.canvas.on('text:changed', () => {
        this.inputText = (this.canvas.getActiveObject() as IText).text;
      });


    }
  }

  removeCloseButton(): void {
    let deleteBtnElement = this.canvasElement.nativeElement.querySelector('.deleteBtn');
    if (deleteBtnElement) {
      this.renderer.removeChild(this.canvasElement.nativeElement, deleteBtnElement);
      this.currentCloseButton = null;
    }
  }

  addCloseButton(x: number, y: number): void {
    this.removeCloseButton();
    var btnLeft = x - 11 - 20;
    var btnTop = y - 11 + 20;
    let parser = new DOMParser();
    const delBtn = this.renderer.createElement('button');
    //this.renderer.setAttribute(delImg, 'src', '../../../assets/images/close_icon.png');
    this.renderer.addClass(delBtn, 'deleteBtn');
    this.renderer.addClass(delBtn, 'btn-circle');
    const delImg = this.renderer.createElement('img');
    this.renderer.setAttribute(delImg, 'src', TIMES_PATH);
    this.renderer.appendChild(delBtn, delImg);
    this.renderer.appendChild(this.canvasElement.nativeElement, delBtn);
    this.renderer.setStyle(delBtn, 'width', '22px');
    this.renderer.setStyle(delBtn, 'height', '22px');
    this.renderer.setStyle(delBtn, 'position', 'absolute');
    this.renderer.setStyle(delBtn, 'top', btnTop + 'px');
    this.renderer.setStyle(delBtn, 'left', btnLeft + 'px');
    this.currentCloseButton = delBtn;
    this.renderer.listen(this.currentCloseButton, 'click', (e) => {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.remove(activeObject);
        this.renderer.removeChild(this.canvasElement.nativeElement, delBtn);
        this.currentCloseButton = null;
        if (activeObject.type === 'textbox') {
          this.inputText = '';
        }
        else {
          this.shirtService.unselectGraphic();
        }
      }
    });
    //const deleteBtnMarkup = '<img src="../../../assets/images/close_icon.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
    // let el = parser.parseFromString(deleteBtnMarkup, 'text/xml');
    // this.renderer.appendChild(this.canvasElement.nativeElement, el.documentElement);
    // this.renderer.setStyle(document.querySelector('.deleteBtn'), 'top', btnTop);
    // this.renderer.setStyle(el, 'left', btnLeft);
    // this.renderer.setStyle(el, 'width', '20px');
  }
}
