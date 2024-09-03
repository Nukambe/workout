import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + "/api/auth";

  constructor(private http: HttpClient) { }

  signIn(loginRequest: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, loginRequest, {
      withCredentials: true,
      observe: "response"
    });
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user, {
      withCredentials: true,
      observe: "response"
    });
  }
}
