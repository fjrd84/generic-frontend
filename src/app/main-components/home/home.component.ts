import { Component, OnInit } from '@angular/core';
import { defaultLastPicture } from '../../constants/default-media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _lastPicture: string;
  private _showLogin: boolean;

  public get showLogin(): boolean {
    return this._showLogin;
  }

  public get lastPicture(): string {
    return this._lastPicture;
  }

  constructor() {
    // The last picture will be initialized as the default last picture
    this._lastPicture = defaultLastPicture;
    this._showLogin = false;
  }

  toggleLogin() {
    this._showLogin = !this._showLogin;
  }

  ngOnInit() {
  }

}
