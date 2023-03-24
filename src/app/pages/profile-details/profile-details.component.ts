import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import User from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileDetailsMoviesComponent } from './profile-details-movies/profile-details-movies.component';
import { ProfileDetailsReviewsComponent } from './profile-details-reviews/profile-details-reviews.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import Review from 'src/app/models/Review';
import { ReviewService } from 'src/app/shared/services/review.service';
import MovieSeen from 'src/app/models/MovieSeen';

@Component({
  selector: 'tp-fil-rouge-profile-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, ProfileDetailsMoviesComponent, ProfileDetailsReviewsComponent,],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  user$?: Observable<User | undefined>;
  reviews$?: Observable<Review[]>;
  userSubscription?: Subscription;
  reviewsSubscription?: Subscription;
  viewedMovies?: MovieSeen[];
  reviewedMovies?: Review[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    const id =
      this.route.snapshot.paramMap.get('id') || this.storageService.getUID();
    if (id) {
      this.user$ = this.userService.getUserByUID(id);
      this.userSubscription = this.user$.subscribe((user) => {
        this.viewedMovies = user?.moviesSeen;
      });
      this.reviews$ = this.reviewService.getReviewByUserID(id);
      this.reviews$.subscribe((reviews) => {
        this.reviewedMovies = reviews;
      });
    }
    if (!this.user$) {
      this.router.navigate(['/error?error_key=user_not_found']);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }
}
