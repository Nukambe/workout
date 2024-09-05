import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
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
  unprotectedRoutes: string[] = ["/signup", "/signin"];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.unprotectedRoutes.includes(this.router.url)) {
          if (this.loggedIn) {
            this.router.navigate(["log"]);
          } else {
            this.autoSignIn();
          }
        } else {
          if (!this.loggedIn) {
            this.checkAuthState("signin");
          }
        }
      }
    });
  }

  autoSignIn() {
    this.authService.refresh().subscribe({
      next: () => {
        this.loggedIn = true;
        this.router.navigate(["log"]);
      },
      error: (err) => {
        console.error(err);
        this.loggedIn = false;
      }
    });
  }

  checkAuthState(route: string) {
    this.authService.refresh().subscribe({
      next: () => this.loggedIn = true,
      error: (err) => {
        console.error(err);
        this.loggedIn = false;
        this.router.navigate([route]);
      }
    });
  }
}
