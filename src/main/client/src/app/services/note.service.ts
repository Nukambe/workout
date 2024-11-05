import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Note} from "../models/Note.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl: string = environment.apiUrl + "/api/notes";

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl, {
      withCredentials: true
    });
  }

  updateNotes(notes: Note[]) {
    return this.http.put(this.baseUrl, notes, {
      withCredentials: true,
      observe: 'response'
    });
  }
}
