import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-avatar',
  standalone: true,
  imports: [],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.css'
})
export class UploadAvatarComponent {

  selectedFile: File | null = null;
  response: string = "";

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}


  onSubmit(event: Event) {
    event.preventDefault();

    if (this.selectedFile !== null) {
      this.userService.uploadAvatar(this.selectedFile).subscribe({
        next: (url) => {
          const user = this.authService.getUser();
          user!.avatarUrl = url;
          this.response = "Upload Successful!";
          setTimeout(() => window.location.reload(), 500);
        },
        error: (err) => {
          console.error(err);
          this.response = "Upload Failed! Try again.";
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.response = "";
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  getUser() {
    return this.authService.getUser();
  }
}
