import { Component, OnInit, Input, Output } from '@angular/core';
import { Shirt, IColour } from '../../shared/shirt';
import { ShirtService } from '../../core/shirt.service';
import { EventEmitter } from '@angular/core';
import { COLOURS } from '../../constants/static-data.constants';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css']
})
export class ColourPickerComponent implements OnInit {

  colours = COLOURS;

  @Input() title: string;
  @Input() selectedColour: IColour;
  @Output() selectedColourChange: EventEmitter<IColour>;

  constructor(private shirtService: ShirtService) {
    this.selectedColourChange = new EventEmitter<IColour>();
  }

  ngOnInit() {
  }

  pickColour(colour: IColour): void {
    this.selectedColourChange.emit(colour);
  }

  showSelected(colour: IColour): boolean {
    if (this.selectedColour) {
     return this.selectedColour.name.toLowerCase() === colour.name.toLowerCase();
    }
    return false;
  }
}
