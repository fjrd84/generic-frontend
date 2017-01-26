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
});