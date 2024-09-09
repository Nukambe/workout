import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router, RouterModule} from "@angular/router";
import { User } from '../models/user.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.signIn();
  }

  signIn() {
    this.authService.signIn({ email: this.user.email, password: this.user.password }).subscribe(
      {
        next: () => this.router.navigate(["/log"]),
        error: err => {
          console.error(err);
          alert("Email or Password is incorrect!");
        }
      });
  }
}
