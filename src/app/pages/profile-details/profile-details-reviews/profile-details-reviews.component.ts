import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Review from 'src/app/models/Review';
import { MovieReviewCardComponent } from 'src/app/shared/components/movie-review-card/movie-review-card.component';

@Component({
  selector: 'tp-fil-rouge-profile-details-reviews',
  standalone: true,
  imports: [CommonModule, MovieReviewCardComponent],
  templateUrl: './profile-details-reviews.component.html',
  styleUrls: ['./profile-details-reviews.component.scss'],
})
export class ProfileDetailsReviewsComponent {
  @Input() reviews?: Review[];

  constructor(private route: ActivatedRoute) { }
}
