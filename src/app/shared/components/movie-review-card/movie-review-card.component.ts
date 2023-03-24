import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Review from 'src/app/models/Review';

@Component({
  selector: 'tp-fil-rouge-movie-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-review-card.component.html',
  styleUrls: ['./movie-review-card.component.scss'],
})
export class MovieReviewCardComponent {
  @Input() review!: Review;
}
