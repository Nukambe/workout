import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;
  unprotectedRoutes: string[] = ["/signup", "/signin", "/signout"];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (!this.loggedIn) {
        if (event instanceof NavigationEnd) {
          if (!this.unprotectedRoutes.includes(this.router.url)) {
            this.checkAuthState();
          }
        }
      }
    });
  }

  checkAuthState() {
    this.authService.refresh().subscribe({
      next: () => this.loggedIn = true,
      error: (err) => {
        console.error(err);
        this.loggedIn = false;
        this.router.navigate(["signin"]);
      }
    })
  }
}
