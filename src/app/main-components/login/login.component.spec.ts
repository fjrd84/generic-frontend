/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SessionService } from '../../services/session.service';
import { Http, HttpModule, ConnectionBackend } from '@angular/http';

@Injectable()
class SessionServiceMock{

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      providers: [{
        provide: SessionService,
        useClass: SessionServiceMock
      }, Http, ConnectionBackend],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a login button, and no logout button', () => {
    expect(fixture.debugElement.query(By.css('.login-button'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.logout-button'))).toBe(null);
  });

  it('triggers an http request when clicking on login', () => {
    //
  });

});