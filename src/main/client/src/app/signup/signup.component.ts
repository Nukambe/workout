import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.user.password == this.user.confirmPassword) {
      this.authService.signUp(this.user).subscribe({
        next: res => res.ok ? this.router.navigate(["/signin"]) : console.log(res.status),
        error: err => console.error(err)
      });
    } else {
      alert("Passwords do not match")
    }

  }
}
