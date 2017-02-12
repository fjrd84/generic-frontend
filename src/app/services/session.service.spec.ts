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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService,
        MockBackend,
        BaseRequestOptions,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
    });
  });

  beforeEach(inject([SessionService], s => {
    localStorage.clear();
    sessionService = s;
  }));

  it('exists', () => {
    expect(sessionService).toBeTruthy();
  });

});
