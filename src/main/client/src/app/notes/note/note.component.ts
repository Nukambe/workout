import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../models/Note.model";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() note: Note = new Note();
  @Output() deleted: EventEmitter<void> = new EventEmitter();
  @Output() saved: EventEmitter<void> = new EventEmitter();
  edited: boolean = false;
  editTitle: boolean = false;

  constructor() {
  }

  editNote(event: any, title: boolean) {
    event.preventDefault();
    if (title) {
      this.note.title = event.target.value;
    } else {
      this.note.body = event.target.value;
    }
    this.edited = true;
  }

  saveNote() {
    this.edited = false;
    this.editTitle = false;
    this.saved.emit();
  }

  toggleEdit(): void {
    this.editTitle = !this.editTitle;
  }

  deleteNote(): void {
    this.deleted.emit();
  }
}
