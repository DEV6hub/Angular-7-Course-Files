import { Component, OnInit } from '@angular/core';
import { COLOURS } from '../../constants/static-data.constants';

@Component({
  selector: 'app-style-colors',
  templateUrl: './style-colors.component.html',
  styleUrls: ['./style-colors.component.css']
})
export class StyleColorsComponent implements OnInit {
  colours = COLOURS;
  constructor() { }

  ngOnInit() {
  }

}
