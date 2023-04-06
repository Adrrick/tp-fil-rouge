import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavbarItemComponent } from '../bottom-navbar-item/bottom-navbar-item.component';


@Component({
  selector: 'tp-fil-rouge-bottom-navbar',
  standalone: true,
  imports: [CommonModule, BottomNavbarItemComponent],
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
})
export class BottomNavbarComponent {

  navbarItems = [
    { icon: "home", label: "home", path: '/home' },
    { icon: "explore", label: "explore", path: '/explore' },
    { icon: "search", label: "search", path: '/search' },
    { icon: "chat", label: "chat", path: '/review_flow' },
  ]
}
