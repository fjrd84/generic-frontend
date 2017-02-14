import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private _baseUrl: string; // Url of the API
  private _authToken: string; // The current JWT auth token  
  private _loggedIn: Boolean; // True when the user has been successfully logged in
  private _user: any; // _user describes the properties of a user (name, surname, etc.)

  public get authToken() {
    return this._authToken;
  }

  public get user() {
    return this._user;
  }

  public get loggedIn() {
    return this._loggedIn;
  }

  /**
   * Creates an instance of SessionService. 
   * 
   * When login information is available in the local storage, the user 
   * object is automatically retrieved.
   * 
   * @param {Http} http
   */
  constructor(private http: Http, private _router: Router) {
    this._baseUrl = environment.baseUrl;
    this._loggedIn = false;
    this._authToken = localStorage.getItem('authToken');
    this._user = {};
    this.updateUserInfo();
  }

  /**
   * Return request options for the current service.
   * They contain: Authorization (jwt) and Content-Type (application/json) 
   * headers.
   * @private
   * @returns {RequestOptions}
   */
  private _getRequestOptions(): RequestOptions {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this._authToken
    });
    return new RequestOptions({ headers: headers });
  }

  /**
   * It retrieves the user object from the API. 
   * The user login data (containing the AuthToken is necessary at this point).
   * @returns {Observable<Object>}
   * @memberOf SessionService
   */
  getUserInfo(): Observable<Object> {
    let self = this;
    let options = this._getRequestOptions();

    return this.http.get(this._baseUrl + "/auth/profile/", options)
      .map(res => {
        self._loggedIn = true;
        let data = this.extractData(res);
        self._user = data;
        return data;
      })
      .catch(this.handleError);
  }

  connectWithGoogle() {
    window.location.replace(this._baseUrl + "/auth/connect/google/?token=" + this._authToken);
  }

  /**
   * If an auth token has been specified, try to obtain the user information.
   * @param {string} authToken
   */
  oAuthLogin(authToken: string) {
    this._authToken = authToken;
    localStorage.setItem('authToken', this._authToken);
    this.getUserInfo().subscribe(data => {
      // when the authToken and userId are right, we navigate back home.
      this._router.navigate(['']);
    });
  }

  /**
   * Helper to call the getUserInfo function and subscribe to a result.
   * @memberOf SessionService
   */
  updateUserInfo() {
    // Without a token, no user information can be retrieved.
    if (this._authToken === null) {
      return;
    }
    this.getUserInfo().subscribe(data => {
    });
  }

  /**
   * It attempts to login a user using the specified username and password.
   * @param {string} username
   * @param {string} password 
   * @returns {Observable<Object>} An observable that provides with the information about the logged in user or an error.
   */
  logIn(username: string, password: string): Observable<Object> {
    let self = this;
    return this.http.post(this._baseUrl + "/auth/login",
      { email: username, password: password }, this._getRequestOptions())
      .map(res => {
        let data = this.extractData(res);
        self._authToken = data.token;
        localStorage.setItem('authToken', data.token);
        // After a successful login, the user information is retrieved.
        self.updateUserInfo();
        return data;
      })
      .catch(this.handleError);
  }


  /**
   * It logs out the currently logged in user.
   * @memberOf SessionService
   */
  logOut() {
    return this.http.get(this._baseUrl + "/auth/logout",
      this._getRequestOptions())
      .map(res => {
        this._authToken = null;
        this._user = {};
        this._loggedIn = false;
        localStorage.clear();
        return true;
      }).catch(this.handleError);
  }


  /**
   * Generic data extractor for JSON a Response.
   * @param {Response} res
   * @returns {*} The JSON parsed response.
   * @memberOf SessionService
   */
  extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }

  /**
   * Generic error handler.
   * @param {(Response | any)} error
   * @returns
   * @memberOf SessionService
   */
  handleError(error: Response | any) {
    return Observable.throw("test error");
  }

}
