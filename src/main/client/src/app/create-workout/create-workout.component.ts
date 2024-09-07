import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @Input() workout: Workout = new Workout();
  @Output() saved: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  focusedExercise: number = 0;

  constructor(private workoutService: WorkoutService, private router: Router) {
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
    this.workoutService.createWorkout(this.workout).subscribe(
      {
        next: () => this.router.navigate(["log"]),
        error: (err) => console.error(err)
      }
    );
  }

  editWorkout() {
    this.workoutService.saveWorkout(this.workout).subscribe(
      {
        next: () => this.saved.emit(),
        error: (err) => console.log(err)
      }
    );
  }

  cancelEdit() {
    this.cancel.emit();
  }

  deleteExercise(index: number) {
    this.workout.exercises.splice(index, 1);
  }

  canCreate() {
    return !this.workout.exercises.every(exercise => exercise.name !== "");
  }
}
