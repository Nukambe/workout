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
  @Input() units: string = "kg";
  open: boolean = false;

  constructor() {
  }

  openCloseExercise() {
    this.open = !this.open;
    // console.log(this.exercise);
  }

}
