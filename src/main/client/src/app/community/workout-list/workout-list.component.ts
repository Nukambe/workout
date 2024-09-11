import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/Workout.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {

  workouts: { user: User, workout: Workout }[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.workoutService.getCommunityWorkouts({}).subscribe({
      next: (workouts) => {
        this.workouts = workouts;
      },
      error: (err) => console.error(err)
    });
  }
}
