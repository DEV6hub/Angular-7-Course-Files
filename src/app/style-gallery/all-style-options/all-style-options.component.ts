import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-style-options',
  templateUrl: './all-style-options.component.html',
  styleUrls: ['./all-style-options.component.css']
})
export class AllStyleOptionsComponent implements OnInit {
  data: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data;
  }
  canDeactivate() {
    console.log('i am navigating away');
    return window.confirm('Have you made up your mind about what kind of tshirt you need or want to browser more style options?');
  }
}
