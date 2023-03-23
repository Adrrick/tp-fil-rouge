import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from './shared/components/bottom-navbar/bottom-navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, BottomNavbarComponent, HeaderComponent, MatSnackBarModule],
  selector: 'tp-fil-rouge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tp-fil-rouge';
}
