import { Component, OnInit } from '@angular/core';
import { Workout } from '../../models/Workout.model';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-week-summary',
  standalone: true,
  imports: [],
  templateUrl: './week-summary.component.html',
  styleUrl: './week-summary.component.css'
})
export class WeekSummaryComponent implements OnInit {

  workouts: Workout[] = [];
  today = new Date();

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    const end = new Date(this.today);
    end.setDate(this.today.getDate() - 7);

    this.workoutService.searchWorkouts({
      start: this.today.toISOString(),
      end: end.toISOString()
    }).subscribe({
      next: (workouts) => this.workouts = workouts,
      error: (err) => console.error(err)
    });
  }
}
