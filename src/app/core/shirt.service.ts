import { Injectable } from '@angular/core';
import { Shirt, IColour, IGraphic } from '../shared/shirt';
import { BehaviorSubject, Observable } from 'rxjs';
import { SHIRTS } from '../constants/static-data.constants';
import 'fabric';

declare const fabric: any;

const SHIRT_IMAGES_PATH = '../../../assets/images/plain-shirts/';
const GRAPHICS_IMAGES_PATH = '../../../assets/images/graphics/';

@Injectable()
export class ShirtService {

    private shirts: Shirt[];
    private editableShirt: Shirt;
    private designCanvas: fabric.Canvas;
    private shirtsSubject: BehaviorSubject<Shirt[]>;
    private editableShirtSubject: BehaviorSubject<Shirt>;
    private designCanvasSubject: BehaviorSubject<fabric.Canvas>;

    private lastUsedId = 8;

    constructor() {
        this.shirtsSubject = new BehaviorSubject<Shirt[]>([]);
        this.shirts = SHIRTS;
        this.setShirts();
        this.editableShirt = this.initiateEditableShirt();
        // this.editableShirt.graphic;
        this.editableShirtSubject = new BehaviorSubject(this.editableShirt);
        this.designCanvasSubject = new BehaviorSubject(this.designCanvas);
    }

    private initiateEditableShirt(): Shirt {
        const s: Shirt = new Shirt();
        s.shirtStyle = 'MensShirt';
        s.description = 'Mens Fine Jersey Short Sleeve';
        s.price = 19.99;
        return s;
    }

    private setShirts() {
        this.shirtsSubject.next(this.shirts);
    }

    private emitEditableShirt(): void {
        this.editableShirtSubject.next(this.editableShirt);
    }

    resetEditableShirt(): void {
        this.editableShirt = this.initiateEditableShirt();
        this.emitEditableShirt();
    }

    setDesignCanvas(canvas: fabric.Canvas): void {
        this.designCanvas = canvas;
        this.designCanvasSubject.next(this.designCanvas);
    }

    getDesignCanvas(): Observable<fabric.Canvas> {
        return this.designCanvasSubject.asObservable();
    }

    getShirts(): Observable<Shirt[]> {
        return this.shirtsSubject.asObservable();
    }

    getEditableShirt(): Observable<Shirt> {
        return this.editableShirtSubject.asObservable();
    }

    selectStyle(style: any): void {
        this.editableShirt.shirtStyle = style.imgName;
        this.editableShirt.description = style.imgDescription;
        this.emitEditableShirt();
    }

    selectColour(colour): void {
        this.editableShirt.shirtColour = colour;
        this.emitEditableShirt();
    }

    selectGraphicColour(colour: IColour): void {
        this.editableShirt.graphic.colour = colour;
        this.editableShirt.graphic.fileName = this.getGraphicImagePath();
        this.emitEditableShirt();
    }

    updateShirtText(text): void {
        this.editableShirt.text.value = text;
        this.emitEditableShirt();
    }

    updateShirtGraphic(graphic: IGraphic): void {
        this.editableShirt.graphic = graphic;
        this.emitEditableShirt();
    }

    unselectGraphic(): void {
        this.editableShirt.graphic = { name: '', colour: { name: '', value: ''}, fileName: '' };
        this.emitEditableShirt();
    }

    updateShirtTextFont(font): void {
        this.editableShirt.text.font = font;
    }

    getStyleImagePath(style?, shirt?: Shirt): string {
        const obj: Shirt = shirt || this.editableShirt;
        return `${SHIRT_IMAGES_PATH}${(style) ? style.imgName : obj.shirtStyle}-${obj.shirtColour.name.toLowerCase()}.png`;
    }

    getGraphicImagePath(graphic?): string {

        let usedGraphic: IGraphic;
        if (graphic) {
            usedGraphic = graphic;
        } else {
            usedGraphic = this.editableShirt.graphic;
        }

        return this.buildGraphicPath(usedGraphic);

        // const file = `${(graphic) ? graphic.fileName :
        //     (this.editableShirt.graphic.fileName !== '' ? this.editableShirt.graphic.fileName : '')}`;

        // return (file !== '') ? (this.editableShirt.graphic.colour && this.editableShirt.graphic.colour.value !== '') ?
        //     `${GRAPHICS_IMAGES_PATH}${file.split('.')[0].trim()}_${this.editableShirt.graphic.colour.value}.png`:
        //     `${GRAPHICS_IMAGES_PATH}${file}` : '';
    }

    private buildGraphicPath(graphic: IGraphic): string {
        return (graphic.colour && graphic.colour.value !== '') ?
            `${GRAPHICS_IMAGES_PATH}${graphic.fileName.split('.')[0].trim()}_${graphic.colour.value.replace('#', '')}.png` :
            `${GRAPHICS_IMAGES_PATH}${graphic.fileName}`;
    }

    isStyleSelected(style): boolean {
        return style.imgName === this.editableShirt.shirtStyle;
    }

    // getShirt(id: number): Shirt {

    //     this.getShirts().subscribe((shirts) => {
    //         return shirts.filter(shirt => shirt.id === id);
    //     });


    // }

    duplicateShirt(shirt: Shirt): void {

        const idx: number = this.shirts.findIndex(s => s.id === shirt.id);
        if (idx !== -1) {
            const duplicatedShirt = Object.assign(new Shirt(), shirt, { id: ++this.lastUsedId });
            this.shirts.push(duplicatedShirt);
            this.shirtsSubject.next(this.shirts);
        }
    }

    addShirt(shirt: Shirt): void {
        const newShirt: Shirt = Object.assign(new Shirt(), shirt, { id: ++this.lastUsedId });
        this.shirts.push(newShirt);
        this.shirtsSubject.next(this.shirts);
    }

    deleteShirt(shirt: Shirt): void {

        const idx: number = this.shirts.findIndex(existingShirt => existingShirt.id === shirt.id);
        if ( idx !== -1 ) {
            this.shirts.splice(idx, 1);
            this.shirtsSubject.next(this.shirts);
        }
    }

    getShoppingCartShirts(): Shirt[] {
        return this.shirts.filter(s => s.id === 4 || s.id === 3 || s.id === 8 || s.id === 1 || s.id === 7);
    }
}

