import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GRAPHICS } from '../../constants/static-data.constants';
import {trigger, state, style, animate, transition, group} from '@angular/animations';
@Component({
  selector: 'app-all-graphics',
  templateUrl: './all-graphics.component.html',
  styleUrls: ['./all-graphics.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AllGraphicsComponent implements OnInit {
  graphics = GRAPHICS;
  constructor() { }

  ngOnInit() {
  }
}
