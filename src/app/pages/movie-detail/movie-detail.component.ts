import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import MovieDetails from 'src/app/models/Movie-details';
import { ReviewFormComponent } from "../../shared/components/review-form/review-form.component";
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import User from 'src/app/models/User';
import MovieSeen from 'src/app/models/MovieSeen';
import { ReviewService } from 'src/app/shared/services/review.service';
import Review from 'src/app/models/Review';


@Component({
  selector: 'tp-fil-rouge-movie-detail',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MoviesService],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie$: Observable<MovieDetails> | undefined;
  user$?: Observable<User | undefined>;
  review$?: Observable<Review[]>;
  userSubscription?: Subscription;
  movieSubscription?: Subscription;
  reviewSubscription?: Subscription;
  viewedMovies?: MovieSeen[];
  viewedMoviesId?: number[];
  currentMovie?: MovieSeen;
  currentReview?: Review;
  uid?: string = this.authService.currentUser?.uid;

  constructor(
    private moviesServices: MoviesService,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService,
    private userService: UserService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie$ = this.moviesServices.getMovieDetails(id);
      if (this.uid && this.movie$) {
        const userID = this.uid;
        this.user$ = this.userService.getUserByUID(userID);
        this.userSubscription = this.user$.subscribe(user => {
          this.viewedMovies = user?.moviesSeen;
          this.viewedMoviesId = user?.moviesSeen.map(movie => movie.movieId);
        });
        this.movieSubscription = this.movie$.subscribe(movie => {
          this.currentMovie = {
            movieId: movie.id,
            posterPath: movie.poster_path,
            title: movie.title,
          };
          this.review$ = this.reviewService.getReviewByUserID(userID);
          this.reviewSubscription = this.review$.subscribe(reviews => {
            this.currentReview = reviews.find(review => review.movieId === this.currentMovie?.movieId);
          });
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
    if (this.reviewSubscription) {
      this.reviewSubscription.unsubscribe();
    }
  }

  handleClick(addMovie: boolean): void {
    if (this.uid && this.currentMovie && this.viewedMovies) {
      if (addMovie) {
        const movieList = [...this.viewedMovies, this.currentMovie];
        this.userService.updateUser(this.uid, { moviesSeen: movieList });
      } else {
        const movieToRemove = this.currentMovie.movieId;
        const movieList = this.viewedMovies.filter(movie => movie.movieId !== movieToRemove);
        this.userService.updateUser(this.uid, { moviesSeen: movieList });
        if (this.currentReview) {
          this.reviewService.removeReview(this.currentReview.movieId, this.currentReview.user);
        }
      }
    }
  }
}

