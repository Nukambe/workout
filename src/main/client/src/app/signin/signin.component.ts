import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
          next: res => res.ok ? this.router.navigate(["/log"]) : console.log(res.status),
          error: err => console.error(err)
        });
    }
  }
}
