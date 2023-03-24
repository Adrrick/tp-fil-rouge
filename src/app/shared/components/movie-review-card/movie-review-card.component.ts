import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Review from 'src/app/models/Review';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tp-fil-rouge-movie-review-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './movie-review-card.component.html',
  styleUrls: ['./movie-review-card.component.scss'],
})
export class MovieReviewCardComponent {
  @Input() review!: Review;
}
