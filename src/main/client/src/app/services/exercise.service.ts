import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaxProgressRecord } from '../models/MaxProgressRecord.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private baseUrl = environment.apiUrl + "/api/exercises";

  constructor(private http: HttpClient) { }

  getMaxProgressReport(): Observable<MaxProgressRecord[]> {
    return this.http.get<MaxProgressRecord[]>(this.baseUrl + "/max-progress-report", {
      withCredentials: true
    });
  }
}
