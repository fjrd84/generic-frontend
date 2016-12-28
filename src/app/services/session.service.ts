import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  public authToken: string;
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = "http://localhost:3000/api/";
    this.authToken = localStorage.getItem('authToken');
  }

  attemptLogin(username: string, password: string): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "Users/login", { username: username, password: password }, options)
      .map(res => {
        let data = this.extractData(res);
        this.authToken = data.id;
        localStorage.setItem('authToken', this.authToken);
        return data;
      })
      .catch(this.handleError);
  }

  // logout
  // http://localhost:3000/api/Users/logout?access_token=9LvMktCOZzzDjNuPJbBPxy7A1XBbualDAjjml5hW4ZySvM1GA0JJ50IexYMxyNi7

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    return Observable.throw("test error");
  }

}
