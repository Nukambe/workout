import {Component, OnInit, ViewChild} from '@angular/core';
import {Workout} from "../models/Workout.model";
import {WorkoutService} from "../services/workout.service";
import {ActivatedRoute} from "@angular/router";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {Exercise} from "../models/Exercise.model";
import {ExerciseComponent} from "../exercise/exercise.component";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    ExerciseModalComponent,
    ExerciseComponent
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent implements OnInit {

  @ViewChild(ExerciseModalComponent) exerciseModal!: ExerciseModalComponent;

  workout: Workout | null = null;
  id: number = 0;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || "0");
    this.getWorkout();
  }

  getWorkout() {
    this.workoutService.getWorkout(this.id).subscribe({
      next: workout => {
        console.log(workout);
        this.workout = workout;
      },
      error: err => console.error(err)
    });
  }

  saveWorkout() {
    if (!this.workout) return;
    console.log("saving workout");
    this.workoutService.saveWorkout(this.workout).subscribe({
      next: workout => this.workout = workout,
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

  addExercise(exercise: { exercise: Exercise, edit: boolean }) {
    if (!this.workout) return;
    if (exercise.edit) {
      const index = this.workout.exercises.findIndex(workout_exercise => workout_exercise.id == exercise.exercise.id);
      exercise.exercise.sets.sort((a, b) => b.number - a.number);
      this.workout.exercises[index] = exercise.exercise;
    } else {
      this.workout.exercises.push(exercise.exercise);
    }
    this.saveWorkout();
  }
}
