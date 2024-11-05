import {Component, OnInit} from '@angular/core';
import {NoteComponent} from "./note/note.component";
import {Note} from "../models/Note.model";
import {NoteService} from "../services/note.service";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NoteComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe({
      next: (notes) => {
        console.log(notes);
        this.notes = notes;
        this.addEmptyNote();
      },
      error: (err) => console.error(err)
    });
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.noteService.updateNotes(this.notes).subscribe({
      next: () => {
        this.addEmptyNote();
      },
      error: (err) => console.error(err),
    });
  }

  saveNote() {
    console.log(this.notes);
    this.noteService.updateNotes(this.notes).subscribe({
      next: () => {
        this.addEmptyNote();
      },
      error: (err) => console.error(err),
    });
  }

  addEmptyNote() {
    if (!this.notes.length) {
      this.notes.push(new Note());
      return;
    }
    const finalNote = this.notes[this.notes.length - 1];
    if (!(finalNote.title === "" && finalNote.body === "")) {
      this.notes.push(new Note());
    }
  }
}
