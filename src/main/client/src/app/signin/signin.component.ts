import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email = new FormControl("");
  password = new FormControl("");

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const email = this.email.getRawValue();
    const password = this.password.getRawValue()

    if (!email || !password) {
      alert("Please enter an Email and Password");
    } else {
      this.authService.signIn({ email, password }).subscribe(
        {
          next: () => this.router.navigate(["/log"]),
          error: err => console.error(err)
        });
    }
  }
}
