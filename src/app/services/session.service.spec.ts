/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  RequestMethod,
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
      let text = connection.request.json();
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('/auth/login');
      expect(connection.request.headers.get('Content-Type')).toEqual("application/json");
      expect(text.email).toEqual("someUser");
      expect(text.password).toEqual("somePassword");
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

  it('should retrieve the user profile', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/auth/profile');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      expect(connection.request.headers.get('Authorization')).toEqual('JWT someNiceToken');
      let options = new ResponseOptions({
        body: JSON.stringify({id: 'someId', local: {email: 'mrmr@lol.com'}})
      });
      connection.mockRespond(new Response(options));
    });
    sessionService._authToken = 'someNiceToken';
    expect(sessionService.loggedIn).toBeFalsy();
    sessionService.getUserInfo()
      .subscribe(() => {
        expect(sessionService.loggedIn).toBeTruthy();
        expect(sessionService.user.id).toEqual('someId');
        done();
      });
  });

});
