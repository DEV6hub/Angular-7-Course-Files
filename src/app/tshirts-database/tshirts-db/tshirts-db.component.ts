import { Component, OnInit } from '@angular/core';
import {HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {trigger, state, style, animate, transition, group} from '@angular/animations';

@Component({
  selector: 'app-tshirts-db',
  templateUrl: './tshirts-db.component.html',
  animations: [
    trigger('heroState', [
      state('M', style({
        backgroundColor: 'blue',
        transform: 'scale(1)'
      })),
      state('F',   style({
        backgroundColor: 'pink',
        transform: 'scale(1.1)'
      })),
      transition('M => F', animate('100ms ease-in')),
      transition('F => M', animate('100ms ease-out'))
    ])
  ]
})
export class TshirtsDbComponent {

  //apiRoot = 'http://httpbin.org';
  apiRoot = 'http://localhost:4000/tshirts';
 results;

  constructor(private http: Http) { }

  doGETAll() {
    console.log('GET ALL');
    const url = `${this.apiRoot}`;
    this.http.get(url).subscribe(res => {
      console.log(res.json());
      this.results = res.json();
    });
  }

  doGET() {
    console.log('GET');
    const url = `${this.apiRoot}`;
    const search = new URLSearchParams();
    search.set('name', 'Happy Shirt');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.results = res.json();
    });
  }

  doPOST() {
    console.log('POST');
    const url = `${this.apiRoot}`;
    const data = {
      'id': 9,
      'name': 'Test Shirt',
      'type': 'Mens Fine Jersey Short Sleeve',
      'price': 21.99,
      'imgSrc': '/assets/images/TShirtTest.jpg',
      'gender': 'M'
    };
    this.http.post(url, data).subscribe(res => {
      console.log(res.json());
    });
  }

  doPUT() {
    console.log('PUT');
    const url = `${this.apiRoot}/2`;
    const data = {
      'type': 'Mens Fine Jersey Short Sleeve',
      'price': 21.99,
      'imgSrc': '/assets/images/TShirtChange.jpg',
      'gender': 'M'
    };
    this.http.put(url, data).subscribe(res => {
        console.log(res.json());
      } );
  }

  doDELETE() {
    console.log('DELETE');
    const url = `${this.apiRoot}/2`;
    const search = new URLSearchParams();
    search.set('id', '2');
    this.http.delete(url).subscribe(res => {
        console.log(res.json());
      });
  }

  doGETAsPromise() {
    console.log('GET AS PROMISE');
    const url = `${this.apiRoot}`;
    this.http.get(url).toPromise()
    .then(res => {
      console.log(res.json());
      this.results = res.json();
    });
  }

  doGETAsPromiseError() {
    console.log('GET AS PROMISE ERROR');
    const url = `${this.apiRoot}/post`;
    this.http.get(url)
      .toPromise()
      .then(
        res => console.log(res.json()),
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
          alert(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  doGETAsObservableError() {
    console.log('GET AS OBSERVABLE ERROR');
    const url = `${this.apiRoot}/post`;
    this.http.get(url).subscribe(
      res => console.log(res.json()),
      msg => {
        console.error(`Error: ${msg.status} ${msg.statusText}`);
        alert(`Error: ${msg.status} ${msg.statusText}`);
      }
    );
  }

  doGETWithHeaders() {
    console.log('GET WITH HEADERS');
    const headers = new Headers();
    headers.append('Authorization', 'user:Gagan');
    const opts = new RequestOptions();
    opts.headers = headers;
    const url = `${this.apiRoot}`;
    this.http.get(url, opts).subscribe(
      res => console.log(res.json()),
      msg =>  {
        console.error(`Error: ${msg.status} ${msg.statusText}`);
        alert(`Error: ${msg.status} ${msg.statusText}`);
      }
    );
  }

}
