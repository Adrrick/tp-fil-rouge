import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, first } from 'rxjs';
import Review from 'src/app/models/Review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { MovieReviewCardComponent } from 'src/app/shared/components/movie-review-card/movie-review-card.component';
import { UserService } from 'src/app/shared/services/user.service';
import User from 'src/app/models/User';

interface customReview {
  review: Review;
  user: User;
}
@Component({
  selector: 'tp-fil-rouge-review-flow',
  standalone: true,
  imports: [CommonModule, MovieReviewCardComponent],
  templateUrl: './review-flow.component.html',
  styleUrls: ['./review-flow.component.scss'],
})

export class ReviewFlowComponent implements OnInit, OnDestroy {

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
  ) { }

  reviewFlow$?: Observable<Review[]>;
  reviewFlowSubscription?: Subscription;
  reviewObjects: customReview[] = [];

  public ngOnInit(): void {
    this.reviewFlow$ = this.reviewService.getFlowReviews();
    if (this.reviewFlow$) {
      this.reviewFlowSubscription = this.reviewFlow$.subscribe(reviews => {
        reviews.forEach(review => {
          this.userService.getUserByUID(review.user)
            .pipe(first())
            .subscribe(user => {
              if (user) {
                this.reviewObjects.push({ review: review, user: user})
              }
            });
        });
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.reviewFlowSubscription) {
      this.reviewFlowSubscription.unsubscribe();
    }
  }

}
