import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  reports: { title: string, link: string }[] = [
    { title: "WEEK SUMMARY", link: "/reports/week-summary" },
    { title: "MAX PROGRESS", link: '/reports/max-progress' }
  ];
}
