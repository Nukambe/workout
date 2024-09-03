import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Exercise} from "../models/Exercise.model";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  @Input() exercise!: Exercise;
  @Output() editExercise = new EventEmitter();

  constructor() {
  }

  edit() {
    this.editExercise.emit();
  }

}
