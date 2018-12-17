import { Component, OnInit, ViewChild } from '@angular/core';
import { ShirtService } from '../../core/shirt.service';
import { Shirt, IGraphic, IColour } from '../../shared/shirt';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

const FRACTAL_PATH = '../../../assets/images/Fractal.png';
const SAVED_TAB = 'design_tab';

@Component({
  selector: 'app-design-shirt',
  templateUrl: './design-shirt.component.html',
  styleUrls: ['./design-shirt.component.css']
})
export class DesignShirtComponent implements OnInit {

  bgPath: string = FRACTAL_PATH;

  activeTab: number;
  editableShirt: Shirt;
  sub: Subscription;

  colourPickerTitle = 'Choose a shirt colour';

  constructor(private shirtService: ShirtService) {
  }

  ngOnInit() {
    const savedTab = localStorage.getItem(SAVED_TAB);
    if (!savedTab) {
      localStorage.setItem(SAVED_TAB, '1');
    }
    // tslint:disable-next-line:radix
    this.activeTab = parseInt(localStorage.getItem(SAVED_TAB));
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });
  }

  toggleTab(tabId: number): void {
    this.activeTab = tabId;
    localStorage.setItem(SAVED_TAB, tabId.toString());
  }

  getStyleImagePath(): string {
    return this.shirtService.getStyleImagePath();
  }

  getGraphicImagePath(graphic?): string {
    return this.editableShirt.graphic.fileName ? this.shirtService.getGraphicImagePath(graphic) : '';
  }

  changeGraphic(graphic?: IGraphic): void {
    const selectedGraphic = graphic ? graphic : this.editableShirt.graphic;
    this.editableShirt.graphic = selectedGraphic;
  }

  changeGraphicColour(colour: IColour): void {
    this.editableShirt.graphic.colour = colour;
  }

  getTextColour(): string {
    return (this.editableShirt.text.colour ? this.editableShirt.text.colour.value : '');
  }

  getTextFont(): string {
    return (this.editableShirt.text.font ? this.editableShirt.text.font : '');
  }

  getTextValue(): string {
    return (this.editableShirt.text.value ? this.editableShirt.text.value : '');
  }

  changeTextValue(value: string): void {
    this.editableShirt.text.value = value;
  }

  hasGraphic(): boolean {
    return (this.editableShirt.graphic ? this.editableShirt.graphic.name !== '' : false);
  }

  hasText(): boolean {
    return (this.editableShirt.text ? this.editableShirt.text.value !== '' : false);
  }

}
