import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginData: { userName: string, password: string };
  private _baseUrl: string;

  constructor(private _sessionService: SessionService) {
    this._loginData = { userName: "", password: "" };
  }

  ngOnInit() {
    this._baseUrl = environment.baseUrl;
  }


  /**
   * With the current login information, use the session service to perform a login request.
   * @memberOf LoginComponent
   */
  logIn() {
    this._sessionService.logIn(this._loginData.userName, this._loginData.password)
      .subscribe((response) => {
        // The user information will be updated after a successful login.
        this._sessionService.updateUserInfo();
      })
  }

  /**
   * Logout the current user.
   * @memberOf LoginComponent
   */
  logOut() {
    let self = this;
    this._sessionService.logOut().subscribe(data => {
    });
  }


}
