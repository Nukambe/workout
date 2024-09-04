import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Workout} from "../models/Workout.model";

@Component({
  selector: 'app-workout-button',
  standalone: true,
  imports: [],
  templateUrl: './workout-button.component.html',
  styleUrl: './workout-button.component.css'
})
export class WorkoutButtonComponent {

  @Input() workout!: Workout;
  private days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  constructor(private router: Router) {
  }

  openWorkout() {
    this.router.navigate(["log", this.workout.id]);
  }

  formatDate() {
    try {
      return `${this.days[this.workout.date.getUTCDay()]} ${(this.workout.date.getUTCMonth() + 1)}/${this.workout.date.getUTCDate().toString().padStart(2, "0")}/${this.workout.date.getUTCFullYear()}`
    } catch (e) {
      console.error(e);
      return new Date().toDateString();
    }
  }
}
