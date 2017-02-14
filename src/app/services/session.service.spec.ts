/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

describe('SessionService', () => {

  let sessionService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
    });
  });

  beforeEach(inject([SessionService, MockBackend],
    (_sessionService, _mockBackend) => {
      localStorage.clear();
      sessionService = _sessionService;
      backend = _mockBackend;
    }));

  it('exists', () => {
    expect(sessionService).toBeTruthy();
  });

  it('should not be logged in yet', () => {
    expect(sessionService.loggedIn).toBeFalsy();
    expect(sessionService.user).toEqual({});
    expect(sessionService.authToken).toEqual(null);
  });

  it('should attempt to log in', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ token: "someNiceToken" })
      });
      connection.mockRespond(new Response(options));
    });
    sessionService.logIn("someUser", "somePassword")
      .subscribe(() => {
        expect(sessionService.authToken).toEqual("someNiceToken");
        done();
      });
  });

});
