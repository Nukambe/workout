import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Workout } from "../models/Workout.model";
import { Observable } from "rxjs";

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

  getWorkout(id: number): Observable<Workout> {
    return this.http.get<Workout>(this.baseUrl + `/${id}`, {
      withCredentials: true
    });
  }

  saveWorkout(workout: Workout): Observable<Workout> {
    console.log("saving:", workout);
    return this.http.put<Workout>(this.baseUrl + `/${workout.id}`, workout, {
      withCredentials: true
    });
  }
}
