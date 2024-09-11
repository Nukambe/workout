import { Component } from '@angular/core';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [WorkoutListComponent, UserListComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

  categories: { title: string, img: string }[] = [
    { title: "Workouts", img: "/icons/workouts.png" },
    { title: "Users", img: "/icons/users.png" }
  ];

  activeCategory = 0;

  constructor() { }

  activateCategory(index: number) {
    this.activeCategory = index;
  }
}
