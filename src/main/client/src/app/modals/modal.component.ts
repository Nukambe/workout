import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Output('closeModal') close: EventEmitter<void> = new EventEmitter();
  @ViewChild('modalContent') modalContent!: ElementRef<HTMLDivElement>;

  constructor() { }

  closeModal(event: Event) {
    const clickedContent = this.modalContent.nativeElement.contains(event.target as Node);
    if (!clickedContent) this.close.emit();
  }
}
