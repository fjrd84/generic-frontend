/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Http, HttpModule, Headers, RequestMethod, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { defaultLastPicture } from '../../constants/default-media';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      providers: [SessionService, Http, ConnectionBackend],
      declarations: [HomeComponent, LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exists', () => {
    expect(component).toBeTruthy();
  });

  it('has a default last picture before its initialization', () => {
    expect(component.lastPicture).toBe(defaultLastPicture);
  });

  it('should start with the login window deactivated, and toggle should be able to activate it and deactivate it again.', () => {
    let loginWindow = fixture.debugElement.query(By.css('#login-window'));
    // Initially, showLogin is false, and the class 'active' is not present in #login-window
    expect(component.showLogin).toBe(false);
    expect(loginWindow.classes.active).toBe(false);
    component.toggleLogin();
    fixture.detectChanges();
    // After clicking on toggleLogin, showLogin must be true, and 'active' is a class of the #login-window
    expect(component.showLogin).toBe(true);
    expect(loginWindow.classes.active).toBe(true);
  });

});