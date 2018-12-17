import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Shirt, IColour, IGraphic } from '../../shared/shirt';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { ShirtService } from '../../core/shirt.service';
import { GRAPHICS } from '../../constants/static-data.constants';

@Component({
  selector: 'app-graphics-picker',
  templateUrl: './graphics-picker.component.html',
  styleUrls: ['./graphics-picker.component.css']
})
export class GraphicsPickerComponent implements OnInit {

  graphics = GRAPHICS;
  @Output() changeGraphic: EventEmitter<IGraphic>;
  @Output() changeGraphicColour: EventEmitter<IColour>;

  editableShirt: Shirt;
  sub: Subscription;
  graphicColourTitle = 'Change graphic colour';

  constructor(private shirtService: ShirtService) {
    this.changeGraphic = new EventEmitter<IGraphic>();
    this.changeGraphicColour = new EventEmitter<IColour>();
   }

  ngOnInit() {
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });
  }

  pickGraphic(graphic): void {
    const newGraphic = { name: graphic.name, fileName: graphic.fileName };
    // this.shirtService.updateShirtGraphic(newGraphic);
    this.changeGraphic.emit(newGraphic);
    // Object.assign(this.editableShirt.graphic, graphic);
  }

  getGraphicImagePath(graphic): string {
    const path = this.shirtService.getGraphicImagePath(graphic);
    return path;
  }

  changeColour(colour: IColour): void {
    // this.shirtService.selectGraphicColour(colour);
    this.changeGraphicColour.emit(colour);
  }

}
