import { Component, OnInit } from '@angular/core';
import { defaultLastPicture } from '../../constants/default-media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _lastPicture: string; // The URL to the last picture
  private _showLogin: boolean; // Show or hide the login window
  private _showHallOfFame: boolean; // Show or hide the hall of fame

  public get showLogin(): boolean {
    return this._showLogin;
  }

  public get showHallOfFame(): boolean {
    return this._showHallOfFame;
  }

  public get lastPicture(): string {
    return this._lastPicture;
  }

  constructor() {
    // The last picture will be initialized as the default last picture
    this._lastPicture = defaultLastPicture;
    this._showLogin = false;
    this._showHallOfFame = false;
  }

  toggleLogin() {
    this._showLogin = !this._showLogin;
  }

  toggleHallOfFame(){
    this._showHallOfFame = !this._showHallOfFame;
  }

  ngOnInit() {
  }

}
