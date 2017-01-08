import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginData: { userName: string, password: string };

  constructor(private _sessionService: SessionService) {
    this._loginData = { userName: "", password: "" };
  }

  ngOnInit() {
  }


  /**
   * With the current login information, use the session service to perform a login request.
   * @memberOf LoginComponent
   */
  logIn() {
    this._sessionService.logIn(this._loginData.userName, this._loginData.password).subscribe(
      (response) => {
        console.log(response);
      }
    )
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
