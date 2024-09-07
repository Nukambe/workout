import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '../../models/Exercise.model';
import { CreateSetComponent } from '../create-set/create-set.component';
import { Set } from '../../models/Set.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [CreateSetComponent, FormsModule, CommonModule, ConfirmModalComponent],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  @Input() exercise!: Exercise;
  @Input() focused: boolean = false;
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  confirmDelete: boolean = false;

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

  deleteSet(index: number) {
    this.exercise.sets.splice(index, 1);
    this.exercise.sets.forEach((set, i) => set.number = i + 1);
  }

  deleteExercise() {
    this.delete.emit();
  }

  openDeleteModal() {
    this.confirmDelete = true;
  }

  closeDeleteModal() {
    this.confirmDelete = false;
  }
}
