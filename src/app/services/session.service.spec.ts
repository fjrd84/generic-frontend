/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestMethod, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

let options: RequestOptions;

describe('SessionService', () => {

  let sessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService, Http, ConnectionBackend],
      imports: [HttpModule]
    });
  });

  beforeEach(inject([SessionService], s => {
    localStorage.clear();
    sessionService = s;
  }));

  it('exists', () => {
    expect(sessionService).toBeTruthy();
  });

  it('has an empty user in the beginning', () => {
    expect(JSON.stringify(sessionService.userLoginData)).toBe("{}");
  });


});
