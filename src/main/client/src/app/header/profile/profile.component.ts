import { Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChild('profileContainer') profileContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('link') links!: QueryList<ElementRef<HTMLAnchorElement>>;
  @Output() closeNav: EventEmitter<void> = new EventEmitter();
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
    const target = event.target as Node;
    if (!this.profileContainer.nativeElement.contains(target)) {
      this.closeProfile();
    } else {
      for (let i = 0; i < this.links.length; i++) {
        const link = this.links.get(i)!.nativeElement;
        if (link === target) {
          this.closeProfile();
          this.closeNav.emit();
          break;
        }
      }
    }
  }
}
