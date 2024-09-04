import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Exercise} from "../models/Exercise.model";
import {Set} from "../models/Set.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './exercise-modal.component.html',
  styleUrl: './exercise-modal.component.css'
})
export class ExerciseModalComponent {

  @Output() exerciseCreated = new EventEmitter<{ exercise: Exercise, edit: boolean }>();
  exercise: Exercise | null = null;
  isVisible = false;
  isEdit = false;

  constructor() {
  }

  showModal(exercise: Exercise, edit: boolean) {
    this.exercise = exercise;
    this.isEdit = edit;
    this.isVisible = true;
  }

  hideModal() {
    this.isVisible = false;
    this.isEdit = false;
    this.exercise = null;
  }

  addSet() {
    if (!this.exercise) return;
    const set = new Set();
    set.number = this.exercise.sets.length;
    set.ratio = 100.0;
    set.reps = 0;
    this.exercise.sets.push(set);
  }

  createExercise() {
    if (!this.exercise) return;
    this.exerciseCreated.emit({ exercise: this.exercise, edit: this.isEdit });
    this.hideModal();
  }
}
