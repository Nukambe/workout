import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  open: boolean = false;

  constructor(private authService: AuthService) { }

  openCloseProfile() {
    this.open = !this.open;
  }

  closeProfile() {
    this.open = false;
  }

  getUser() {
    return this.authService.getUser();
  }
}
