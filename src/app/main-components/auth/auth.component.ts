import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _sessionService: SessionService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._sessionService.oAuthLogin(params['id'], params['authToken']);
    });
  }

}
