import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Workout} from "../models/Workout.model";
import {WorkoutService} from "../services/workout.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WorkoutButtonComponent} from "../workout-button/workout-button.component";
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month/month.component';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    WorkoutButtonComponent,
    RouterModule,
    CommonModule,
    MonthComponent
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit {

  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  name = new FormControl("")!;
  searchQuery: string = "";
  months: { month: number; year: number }[] = [];

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe({
      next: workouts => {
        this.workouts = workouts.map(workout => {
          const [year, month, day] = (workout.date as any).split("-"); // workout.date is a string on the server
          workout.date = new Date(year, month - 1, day);
          return workout;
        });
        this.filteredWorkouts = this.workouts;
        const months: Set<string> = new Set();
        this.workouts.forEach(workout => months.add(JSON.stringify({ month: workout.date.getMonth(), year: workout.date.getFullYear() })));
        this.months = Array.from(months)
          .map(month => JSON.parse(month))
          .sort((a, b) => {
            if (a.year === b.year) {
              return b.month - a.month;
            }
            return b.year - a.year;
          });
      },
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

  getWorkoutsForMonth(month: number) {
    return this.workouts.filter(workout => {
      console.log(workout.date.getMonth(), month);
      return workout.date.getMonth() === month
    });
  }
}
