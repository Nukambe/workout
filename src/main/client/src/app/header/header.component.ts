import {Component} from '@angular/core';
import {MobileComponent} from "./mobile/mobile.component";
import {DesktopComponent} from "./desktop/desktop.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MobileComponent,
    DesktopComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}