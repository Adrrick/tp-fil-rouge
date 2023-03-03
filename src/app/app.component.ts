import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  selector: 'tp-fil-rouge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tp-fil-rouge';
}
