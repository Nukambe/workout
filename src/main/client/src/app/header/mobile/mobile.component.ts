import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { RouterModule } from '@angular/router';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule
  ],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent {
  open: boolean = false;
  routes: { title: string, link: string }[] = [
    { title: "LOG", link: "/log" },
    { title: "REPORTS", link: "/reports" },
    { title: "SIGN OUT", link: "/signout" }
  ];

  openCloseMenu() {
    this.open = !this.open;
  }

  openMenu() {
    this.open = true;
  }

  closeMenu() {
    this.open = false;
  }
}
