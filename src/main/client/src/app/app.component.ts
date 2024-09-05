import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
