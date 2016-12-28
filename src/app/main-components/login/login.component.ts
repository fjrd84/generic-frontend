import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private currentUser: {userName: string, password: string};

  constructor(private _sessionService: SessionService) {
    this.currentUser = {userName: "", password: ""};
  }

  ngOnInit() {
  }

  logIn(){
    this._sessionService.attemptLogin(this.currentUser.userName, this.currentUser.password).subscribe(
      (response) => {        
        console.log(response);
      }
    )
  }

}
