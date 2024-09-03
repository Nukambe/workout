import {Component, ElementRef, ViewChild} from '@angular/core';
import {Workout} from "../models/Workout.model";
import { Exercise } from "../models/Exercise.model";
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';

@Component({
  selector: 'app-create-workout',
  standalone: true,
  imports: [CreateExerciseComponent],
  templateUrl: './create-workout.component.html',
  styleUrl: './create-workout.component.css'
})
export class CreateWorkoutComponent {

  workout: Workout = new Workout();
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  focusedExercise: number = 0;

  openDatePicker(event: Event) {
    this.dateInput.nativeElement.showPicker();
  }

  addEmptyExercise() {
    this.workout.exercises.push(new Exercise());
  }

  focusExercise(index: number) {
    this.focusedExercise = index + 1;
  }

  unfocusExercise() {
    this.focusedExercise = 0;
  }
}
