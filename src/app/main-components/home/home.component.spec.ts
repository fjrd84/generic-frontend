/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Http, HttpModule, Headers, RequestMethod, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { defaultLastPicture } from '../../constants/default-media';

// Mock the hall-of-fame component with an empty one. 
@Component({
  selector: 'hall-of-fame',
  template: ''
})
export class HallOfFameComponent {
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      providers: [SessionService, Http, ConnectionBackend],
      declarations: [HomeComponent, LoginComponent, HallOfFameComponent]
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

  it('the hall of fame window is initially deactivated, and toggleHallOfFame activates it', () => {
    let hallOfFameWindow = fixture.debugElement.query(By.css('#hall-of-fame-window'));
    // Initially, showLogin is false, and the class 'active' is not present in #login-window
    expect(component.showLogin).toBe(false);
    expect(hallOfFameWindow.classes.active).toBe(false);
    component.toggleHallOfFame();
    fixture.detectChanges();
    // After clicking on toggleLogin, showLogin must be true, and 'active' is a class of the #login-window
    expect(component.showHallOfFame).toBe(true);
    expect(hallOfFameWindow.classes.active).toBe(true);
  });

  it('the mask is shown whenever a window is opened', ()=>{
    expect(component.showMask).toBe(false);
    component.toggleLogin();
    fixture.detectChanges();
    expect(component.showMask).toBe(true);
    component.hideWindows();
    fixture.detectChanges();
    expect(component.showMask).toBe(false); 
  })

});