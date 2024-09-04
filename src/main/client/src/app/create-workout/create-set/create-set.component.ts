import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Set } from '../../models/Set.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css'
})
export class CreateSetComponent {
  @Input() set!: Set;
  @Output() delete: EventEmitter<void> = new EventEmitter();

  deleteSet() {
    this.delete.emit();
  }
}
