import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { MaxProgressRecord } from '../../models/MaxProgressRecord.model';

@Component({
  selector: 'app-max-progress',
  standalone: true,
  imports: [],
  templateUrl: './max-progress.component.html',
  styleUrl: './max-progress.component.css'
})
export class MaxProgressComponent implements OnInit {

  records: MaxProgressRecord[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.getReport();
  }

  getReport() {
    this.exerciseService.getMaxProgressReport().subscribe({
      next: (records) => this.records = records,
      error: (err) => console.error(err)
    });
  }

}
