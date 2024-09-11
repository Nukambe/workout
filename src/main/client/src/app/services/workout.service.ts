import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Workout } from "../models/Workout.model";
import { Observable } from "rxjs";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private baseUrl = environment.apiUrl + "/api/workouts"

  constructor(private http: HttpClient) { }

  createWorkout(workout: Workout) {
    return this.http.post(this.baseUrl, workout, {
      withCredentials: true,
      observe: 'response'
    });
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl, {
      withCredentials: true
    });
  }

  getWorkout(uuid: string): Observable<Workout> {
    return this.http.get<Workout>(this.baseUrl + `/${uuid}`, {
      withCredentials: true
    });
  }

  saveWorkout(workout: Workout) {
    return this.http.put(this.baseUrl, workout, {
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteWorkout(id: string) {
    return this.http.delete(this.baseUrl + `/${id}`, {
      withCredentials: true,
      observe: 'response'
    });
  }

  searchWorkouts(query: { start?: string, end?: string }): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl + `/search?${new URLSearchParams(query)}`, {
      withCredentials: true
    });
  }

  getCommunityWorkouts(query: { title?: string }): Observable<{ user: User, workout: Workout }[]> {
    return this.http.get<{ user: User, workout: Workout }[]>(this.baseUrl + `/community?${new URLSearchParams(query)}`, {
      withCredentials: true
    });
  }
}
