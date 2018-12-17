import { Component, OnInit } from '@angular/core';
import { Shirt } from '../../shared/shirt';
import { Subscription } from 'rxjs';
import { ShirtService } from '../../core/shirt.service';
import { STYLES } from '../../constants/static-data.constants';

@Component({
  selector: 'app-style-picker',
  templateUrl: './style-picker.component.html',
  styleUrls: ['./style-picker.component.css']
})
export class StylePickerComponent implements OnInit {

  styles = STYLES;
  editableShirt: Shirt;
  sub: Subscription;

  constructor(private shirtService: ShirtService) { }

  ngOnInit() {
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });
  }

  pickStyle(style: any): void {
    this.shirtService.selectStyle(style);
  }

  getStyleImagePath(style): string {
    return this.shirtService.getStyleImagePath(style);
  }

  isStyleSelected(style): boolean {
    return this.shirtService.isStyleSelected(style);
  }

}
