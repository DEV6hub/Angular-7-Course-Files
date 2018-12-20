import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { SignupUserInfoComponent } from './components/signup-user-info/signup-user-info.component';
import { StructuralUnlessDirective } from './customDirectives/structural-unless.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';
import { UserInfoService } from './core/user-info.service';

describe('AppComponent', () => {
  let router, location;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        SignupUserInfoComponent,
        StructuralUnlessDirective
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'signup', component: SignupUserInfoComponent }
        ]),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        UserInfoService
      ]
    }).compileComponents();
  }));
  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    router = _router;
    location = _location;
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
