import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { RouterModule } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule,
    ProfileComponent
],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent {

  open: boolean = false;
  @Input() routes: { title: string, link: string, img: string }[] = [];

  constructor() { }

  openCloseMenu() {
    if (this.open) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.open = true;
    document.body.classList.add('no-scroll');
  }

  closeMenu() {
    this.open = false;
    document.body.classList.remove('no-scroll');
  }
}
