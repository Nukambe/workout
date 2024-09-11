import { Component } from '@angular/core';
import { UploadAvatarComponent } from "./upload-avatar/upload-avatar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [UploadAvatarComponent, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
