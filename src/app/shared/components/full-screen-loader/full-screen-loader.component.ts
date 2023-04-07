import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'tp-fil-rouge-full-screen-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './full-screen-loader.component.html',
  styleUrls: ['./full-screen-loader.component.scss'],
})
export class FullScreenLoaderComponent {
}
