import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Workout} from "../models/Workout.model";
import {WorkoutService} from "../services/workout.service";
import {ActivatedRoute} from "@angular/router";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {Exercise} from "../models/Exercise.model";
import {ExerciseComponent} from "../exercise/exercise.component";
import { FormsModule } from '@angular/forms';
import { CreateWorkoutComponent } from '../create-workout/create-workout.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    CreateWorkoutComponent,
    ExerciseModalComponent,
    ExerciseComponent,
    FormsModule
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent implements OnInit {

  @ViewChild(ExerciseModalComponent) exerciseModal!: ExerciseModalComponent;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  workout: Workout | null = null;
  id: string = "";
  edit: boolean = false;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.getWorkout();
  }

  getWorkout() {
    this.workoutService.getWorkout(this.id).subscribe({
      next: workout => {
        workout.date = new Date(`${workout.date}T00:00:00Z`)
        this.workout = workout;
      },
      error: err => console.error(err)
    });
  }

  createExercise(exercise?: Exercise) {
    if (exercise) {
      this.exerciseModal.showModal(exercise, true);
    } else {
      this.exerciseModal.showModal(new Exercise(), false);
    }
  }

  beginEdit() {
    this.edit = true;
  }

  finishEdit() {
    this.edit = false;
  }
}
