import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    RouterLink,
    ProfileComponent
],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  @Input() routes: { title: string, link: string }[] = []
}
