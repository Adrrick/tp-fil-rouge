import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BottomNavbarComponent } from './shared/components/bottom-navbar/bottom-navbar.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, BottomNavbarComponent],
  selector: 'tp-fil-rouge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tp-fil-rouge';
}
