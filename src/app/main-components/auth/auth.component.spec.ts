/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Http, HttpModule, Headers, RequestMethod, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import { AuthComponent } from './auth.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
class SessionServiceMock {
  public oAuthLogin(authToken) {
    return;
  };
}

describe('AuthCompoent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{
        provide: SessionService,
        useClass: SessionServiceMock
      },
      {
        provide: ActivatedRoute,
        useValue: {
          params: Observable.of({ authToken: "someJWTToken" })
        }
      }, Http, ConnectionBackend],
      declarations: [AuthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exists', () => {
    expect(component).toBeTruthy();
  });
});