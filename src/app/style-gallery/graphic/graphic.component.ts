import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  graphicName: string;

  constructor(private route: ActivatedRoute) {
    console.log('const');
   }

  ngOnInit() {
    this.graphicName = this.route.snapshot.params.graphicName;
  }

}
