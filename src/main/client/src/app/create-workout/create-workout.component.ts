import { Component, ElementRef, ViewChild } from '@angular/core';
import { Workout } from "../models/Workout.model";
import { Exercise } from "../models/Exercise.model";
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  standalone: true,
  imports: [CreateExerciseComponent, FormsModule],
  templateUrl: './create-workout.component.html',
  styleUrl: './create-workout.component.css'
})
export class CreateWorkoutComponent {

  workout: Workout = new Workout();
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  focusedExercise: number = 0;

  constructor(private workoutService: WorkoutService, private router: Router) {
    this.workout = new Workout();
    this.workout.name = "new workout";
    this.workout.date = new Date();
  }

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

  parseDate(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return new Date(+year, +month - 1, +day);
  }

  onDateInput(event: Event) {
    this.workout.date = this.parseDate((event.target as HTMLInputElement).value);
  }

  createWorkout() {
    console.log(this.workout);
    this.workoutService.createWorkout(this.workout).subscribe(
      {
        next: (res) => this.router.navigate(["log"]),
        error: (err) => console.error(err)
      }
    )
  }
}
