import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  goSignIn() {
    this.router.navigate(["signin"]);
  }

  goSignUp() {
    this.router.navigate(["signup"]);
  }
}
