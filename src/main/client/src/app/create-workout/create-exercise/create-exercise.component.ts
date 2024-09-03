import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '../../models/Exercise.model';
import { CreateSetComponent } from '../create-set/create-set.component';
import { Set } from '../../models/Set.model';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [CreateSetComponent],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  @Input() exercise!: Exercise;
  @Input() focused: boolean = false;
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  addEmptySet() {
    const set = new Set();
    set.number = this.exercise.sets.length + 1;
    this.exercise.sets.push(set);
  }

  openExercise() {
    this.open.emit(true);
  }

  closeExercise() {
    this.close.emit(false);
  }
}
