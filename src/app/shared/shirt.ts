import { ColourPickerComponent } from '../components/colour-picker/colour-picker.component';

export class Shirt {

    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public price: number = 0,
        public imagePath: string = '',
        public gender?: 'M' | 'F',
        public shirtColour: IColour = { name: 'white', value: '#FFFFFF' },
        public shirtStyle: string = '',
        public graphic: IGraphic =
            { name: '', colour: { name: '', value: ''}, fileName: '' },
        public text: IText = {
            value: '',
            colour: { name: 'black', value: '#444444'},
            font: '"Montserrat", sans-serif'
        },
        public savedDesign: ISavedDesign = { canvasHeight: 0, canvasWidth: 0, canvasJSON: null }
    ) {}
}

export interface IText {
    value: string;
    colour: IColour;
    font: string;
}

export interface IGraphic {
    name: string;
    colour?: IColour;
    fileName: string;
}

export interface IColour {
    name: string;
    value: string;
}

export interface ISavedDesign {
    canvasJSON: Object;
    canvasWidth: number;
    canvasHeight: number;
}
