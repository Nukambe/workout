import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../models/Workout.model';
import { WorkoutButtonComponent } from '../../workout-button/workout-button.component';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [WorkoutButtonComponent],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent {

  @Input() workouts: Workout[] = [];
  @Input() month: { month: number; year: number } = { month: 0, year: 2024 };
  fullMonths: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  showWorkouts: boolean = false;

  constructor() { }

  openWorkouts() {
    this.showWorkouts = true;
  }

  closeWorkouts() {
    this.showWorkouts = false;
  }

  openCloseWorkouts() {
    this.showWorkouts = !this.showWorkouts;
  }
}
