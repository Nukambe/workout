import { Component } from '@angular/core';
import { UploadAvatarComponent } from "./upload-avatar/upload-avatar.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [UploadAvatarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
