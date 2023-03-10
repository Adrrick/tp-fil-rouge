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
}
