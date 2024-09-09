import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  @ViewChild('profileContainer') profileContainer: ElementRef = new ElementRef(HTMLDivElement);
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

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const profile = this.profileContainer.nativeElement.contains(event.target);
    if (!profile) {
      this.closeProfile();
    }
  }
}
