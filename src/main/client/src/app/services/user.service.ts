import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + "/api/users";

  constructor(private http: HttpClient) { }

  uploadAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(this.baseUrl + "/avatar", formData, {
      responseType: 'text',
      withCredentials: true
    })
  }

  getCommunityUsers(query: { name?: string }): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `/community?${new URLSearchParams(query)}`, {
      withCredentials: true
    });
  }
}
