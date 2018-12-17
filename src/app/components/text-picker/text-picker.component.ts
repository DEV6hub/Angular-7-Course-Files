import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shirt } from '../../shared/shirt';
import { ShirtService } from '../../core/shirt.service';
import { FONTS } from '../../constants/static-data.constants';

@Component({
  selector: 'app-text-picker',
  templateUrl: './text-picker.component.html',
  styleUrls: ['./text-picker.component.css']
})
export class TextPickerComponent implements OnInit {

  fonts = FONTS;
  sub: Subscription;
  editableShirt: Shirt;
  textColourTitle: string = "Change text colour";

  constructor(private shirtService: ShirtService) { }

  ngOnInit() {
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });
  }

  changeTextFont(font): void {
    this.shirtService.updateShirtTextFont(font);
  }

  changeShirtText(text: string): void {
    this.shirtService.updateShirtText(text);
  }

}
