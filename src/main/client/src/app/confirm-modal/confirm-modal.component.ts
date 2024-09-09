import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() deny: EventEmitter<void> = new EventEmitter();
  @Input() title: string = "Confirm?"

  constructor() { }

  onConfirm() {
    this.confirm.emit();
  }

  onDeny() {
    this.deny.emit();
  }
}