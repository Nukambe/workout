import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  @Input() routes: { title: string, link: string }[] = []
}
