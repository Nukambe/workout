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
  routes: { title: string, link: string, img: string }[] = [
    { title: "LOG", link: "/log", img: "/icons/notebook.png" },
    { title: "NOTES", link: "/notes", img: "/icons/note.png" },
    { title: "COMMUNITY", link: "/community", img: "/icons/community.png" },
    { title: "REPORTS", link: "/reports", img: "/icons/report.png" },
    // { title: "SIGN OUT", link: "/signout" }
  ];
}
