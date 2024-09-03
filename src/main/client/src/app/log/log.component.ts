import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Workout} from "../models/Workout.model";
import {WorkoutService} from "../services/workout.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WorkoutButtonComponent} from "../workout-button/workout-button.component";

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    WorkoutButtonComponent,
    RouterModule
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit {

  workouts: Workout[] = [];
  name = new FormControl("")!;

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe({
      next: workouts => this.workouts = workouts,
      error: err => console.error(err)
    });
  }

  createWorkout() {
    const workout = new Workout();
    workout.name = this.name.getRawValue()!;
    this.workoutService.createWorkout(workout).subscribe({
      next: workouts => this.workouts = workouts,
      error: err => console.error(err)
    });
  }
}
