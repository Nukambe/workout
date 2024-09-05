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
      if (event instanceof NavigationEnd) { // is navigation ending?
        if (this.unprotectedRoutes.includes(this.router.url)) { // is route /signin or /signup?
          if (this.loggedIn) { // is user logged in?
            this.router.navigate(["log"]); // yes - go to /log
          } else {
            this.autoSignIn(); // no - confirm with server if jwt is valid
          }
        } else if (this.router.url === "/signout") {
          this.loggedIn = false;
        } else { // is route protected?
          if (!this.loggedIn) { // is user logged in?
            this.checkAuthState(); // no - confirm with server if jwt is valid
          }
        }
      }
    });
  }

  autoSignIn() { // called when navigating to /signin or /signup
    this.authService.refresh().subscribe({
      next: () => { // jwt is valid, log in, navigate to /log
        this.loggedIn = true;
        this.router.navigate(["log"]);
      },
      error: (err) => { // jwt is not valid, stay here
        console.error(err);
        this.loggedIn = false;
      }
    });
  }

  checkAuthState() { // called when navigating to protected route
    this.authService.refresh().subscribe({
      next: () => this.loggedIn = true, // jwt is valid, log in, continue
      error: (err) => { // jwt is not valid, log out, navigate to /signin
        console.error(err);
        this.loggedIn = false;
        this.router.navigate(["signin"]);
      }
    });
  }
}
