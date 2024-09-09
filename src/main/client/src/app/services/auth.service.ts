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
  private user: User | null = null;

  constructor(private http: HttpClient) { }

  getUser() {
    return this.user;
  }

  signIn(loginRequest: { email: string, password: string }): Observable<User> {
    const observableUser = this.http.post<User>(`${this.baseUrl}/signin`, loginRequest, {
      withCredentials: true
    });
    observableUser.subscribe({
      next: (user) => this.user = user,
      error: (err) => console.error(err)
    });
    return observableUser;
  }

  signUp(user: User) {
    return this.http.post(`${this.baseUrl}/signup`, user, {
      withCredentials: true,
      observe: "response"
    });
  }

  signOut() {
    return this.http.delete(this.baseUrl, {
      withCredentials: true,
      observe: 'response'
    })
  }

  refresh(): Observable<User> {
    const observableUser = this.http.get<User>(this.baseUrl, {
      withCredentials: true
    });
    observableUser.subscribe({
      next: (user) => this.user = user,
      error: (err) => console.error(err)
    });
    return observableUser;
  }
}
