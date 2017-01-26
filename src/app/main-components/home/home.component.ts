import { Component, OnInit } from '@angular/core';
import { defaultLastPicture } from '../../constants/default-media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _lastPicture: string;

  public get lastPicture(): string {
    return this._lastPicture;
  }

  constructor() {
    // The last picture will be initialized as the default last picture
    this._lastPicture = defaultLastPicture;
  }

  ngOnInit() {
  }

}
