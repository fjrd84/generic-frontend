import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private _baseUrl: string; // Url of the API
  private _userLoginData: any; // _userLoginData describes the user login object, containing login-information such as auth token, ttl and user id
  private _loggedIn: Boolean; // True when the user has been successfully logged in
  private _user: any; // _user describes the properties of a user (name, surname, etc.)


  // GETTERS 
  public get userLoginData() {
    return this._userLoginData;
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
  constructor(private http: Http) {
    this._baseUrl = "http://localhost:3200/api/";
    this._loggedIn = false;
    let userString = localStorage.getItem('userLoginData'),
      userLoginData = {};
    try {
      userLoginData = JSON.parse(userString);
    } catch (error) {
      console.log(error);
    }
    this._userLoginData = userLoginData || {};
    if (typeof this._userLoginData.id !== "undefined") {
      this.updateUserInfo();
    } else {
      this._user = {};
    }
  }

  /**
   * It retrieves the user object from the API. 
   * The user login data (containing the AuthToken is necessary at this point).
   * @returns {Observable<Object>}
   * @memberOf SessionService
   */
  getUserInfo(): Observable<Object> {
    let self = this;
    return this.http.get(this._baseUrl + "Users/" + this._userLoginData.userId + "?access_token=" + this._userLoginData.id)
      .map(res => {
        self._loggedIn = true;
        let data = this.extractData(res);
        self._user = data;
        return data;
      })
      .catch(this.handleError);
  }

  /**
   * Helper to call the getUserInfo function and subscribe to a result.
   * @memberOf SessionService
   */
  updateUserInfo() {
    this.getUserInfo().subscribe(data => {
    });
  }

  /**
   * It attempts to login a user using the specified username and password.
   * 
   * @param {string} username
   * @param {string} password 
   * @returns {Observable<Object>} An observable that provides with the information about the logged in user or an error.
   * 
   * @memberOf SessionService
   */
  logIn(username: string, password: string): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let self = this;
    return this.http.post(this._baseUrl + "Users/login", { username: username, password: password }, options)
      .map(res => {
        let data = this.extractData(res);
        self._userLoginData = data;
        localStorage.setItem('userLoginData', JSON.stringify(data));
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
    let headers = new Headers();
    return this.http.post(this._baseUrl + "Users/logout?access_token=" + this._userLoginData.id, {})
      .map(res => {
        let data = this.extractData(res);
        this._userLoginData = {};
        this._user = {};
        this._loggedIn = false;
        localStorage.setItem("userLoginData", "{}");
        return data;
      }).catch(this.handleError);
  }


  /**
   * Generic data extractor for JSON a Response.
   * 
   * @param {Response} res
   * @returns {*} The JSON parsed response.
   * 
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
