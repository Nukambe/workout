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
  filteredWorkouts: Workout[] = [];
  name = new FormControl("")!;
  searchQuery: string = ""

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe({
      next: workouts => {
        this.workouts = workouts.map(workout => {
          workout.date = new Date(`${workout.date}T00:00:00Z`);
          return workout;
        });
        this.filteredWorkouts = this.workouts;
      }
      ,
      error: err => console.error(err)
    });
  }

  searchText() {
    this.filteredWorkouts = this.workouts.filter(workout => workout.name.includes(this.searchQuery));
  }

  searchDate(event: Event) {
    const dateInput = (event.target as HTMLInputElement).value;
    console.log(dateInput);
    this.searchText();
    if (dateInput) {
      const date = new Date(dateInput);
      this.filteredWorkouts = this.filteredWorkouts.filter(workout => workout.date.toUTCString() === date.toUTCString());
    }
  }
}
