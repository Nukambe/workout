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

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  openWorkout() {
    this.router.navigate([this.workout.id], {relativeTo: this.route});
  }
}
