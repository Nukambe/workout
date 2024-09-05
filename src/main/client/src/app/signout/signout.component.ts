import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent implements OnInit {

  signedOut: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signOut();
  }

  signOut() {
    this.authService.signOut().subscribe({
      next: () => this.signedOut = true,
      error: (err) => {
        this.signedOut = false;
        console.error(err);
      }
    })
  }
}
