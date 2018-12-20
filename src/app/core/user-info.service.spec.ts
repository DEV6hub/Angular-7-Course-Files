import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpResponse, HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserInfoService } from './user-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserInfo } from '../shared/user-info';
import { XHRBackend, ResponseOptions, Response } from '@angular/http';
describe('UserInfoService post calls', () => {
  let injector: TestBed;
  let service: UserInfoService;
  let httpMock: HttpTestingController;
  let http;
  const userInfo = new UserInfo({
    'name': 'TestName',
    'email': 'testName@test.com',
    'phone':   '111-111-1111',
    'address1':    'CA',
    'address2':  'CA',
    'city':    'Mississauga',
    'country': 'CA',
    'province': 'ON',
    'postal': 'm9v4p6'
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [UserInfoService, HttpClient]
    });
    injector = getTestBed();
      service = injector.get(UserInfoService);
      httpMock = injector.get(HttpTestingController);
      http = injector.get(HttpClient);
  });
  it('should be created', done => {
    expect(service).toBeTruthy();
    done();
  });
});
describe('UserInfoService get calls', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [HttpClientModule
      ],
      providers: [
         { provide: XHRBackend, useClass: MockBackend },
        UserInfoService,
        HttpClient
      ]
    }).compileComponents();
  }));
  it('should return an Observable<UserInfo>',
        inject([UserInfoService, XHRBackend], (userInfoService, mockBackend) => {

        const mockResponse = {
          'name': 'TestName',
          'email': 'testName@test.com',
          'phone':   '111-111-1111',
          'address1':    'CA',
          'address2':  'CA',
          'city':    'Mississauga',
          'country': 'CA',
          'province': 'ON',
          'postal': 'm9v4p6'
        };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

    }));
  });
