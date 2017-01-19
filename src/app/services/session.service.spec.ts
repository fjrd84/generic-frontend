/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestMethod, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

let options: RequestOptions;

describe('SessionService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService, Http, ConnectionBackend],
      imports: [HttpModule]
    });
  });

  it('The service exists',
    inject([SessionService], (service: SessionService) => {
      expect(service).toBeTruthy();
    }));

  it('Initial user is an empty object',
    inject([SessionService], (service: SessionService) => {
      expect(JSON.stringify(service.userLoginData)).toBe("{}");
    }));
});
