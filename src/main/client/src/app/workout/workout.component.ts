import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workout } from "../models/Workout.model";
import { WorkoutService } from "../services/workout.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExerciseComponent } from "../exercise/exercise.component";
import { FormsModule } from '@angular/forms';
import { CreateWorkoutComponent } from '../create-workout/create-workout.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CreateWorkoutComponent,
    ExerciseComponent,
    FormsModule,
    ConfirmModalComponent
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent implements OnInit {

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  workout: Workout | null = null;
  freedomWorkout: Workout | null = null;
  id: string = "";
  edit: boolean = false;
  confirmDelete: boolean = false;
  units: string = "kg";

  constructor(private workoutService: WorkoutService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.getWorkout();
  }

  getWorkout() {
    this.workoutService.getWorkout(this.id).subscribe({
      next: workout => {
        workout.date = new Date(`${workout.date}T00:00:00Z`)
        this.workout = workout;
        this.convertFreedomWorkout();
      },
      error: err => console.error(err)
    });
  }

  beginEdit() {
    this.edit = true;
  }

  finishEdit() {
    this.edit = false;
    this.convertFreedomWorkout();
  }

  deleteWorkout() {
    this.workoutService.deleteWorkout(this.workout!.id).subscribe({
      next: () => this.router.navigate(["log"]),
      error: (err) => console.error(err)
    });
  }

  openDeleteModal() {
    this.confirmDelete = true;
  }

  closeDeleteModal() {
    this.confirmDelete = false;
  }

  toggleUnits() {
    this.units = this.units === "kg" ? "lbs" : "kg";
  }

  getDisplayWorkout(): Workout {
    return this.units === "kg" ? this.workout! : this.freedomWorkout!;
  }

  convertFreedomWorkout() {
    this.freedomWorkout = JSON.parse(JSON.stringify(this.workout));
    this.freedomWorkout!.exercises.forEach(exercise => {
      exercise.maxWeight = exercise.maxWeight * 2.20462;
    });
  }
}
