import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StorageService } from "./storage.service";
import Review from "../../models/Review";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private afs: AngularFirestore, private storageService: StorageService, private userService: UserService) { }

  async createReview(movie: { movieId: number, posterPath: string, title: string }, rating: number, comment: string, title: string): Promise<boolean> {
    console.log('CreateReview');
    const user = !this.storageService.getUID() ? ' ' : this.storageService.getUID();

    const isRated = await firstValueFrom(this.afs
      .collection<Review>('/reviews', (ref) => ref.where('movieId', '==', movie.movieId).where('user', '==', user))
      .valueChanges()
      .pipe(map(reviews => reviews.length > 0)));
    if (isRated) {
      return false;
    } else {
      await this.afs.collection<Review>('/reviews').add({ movieId: movie.movieId, movieTitle: movie.title, comment, rating, user, title });
      await this.userService.addMovieToMoviesList(user, movie);
      return true;
    }
  }

  getReviewByUser(): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('user', '==', this.storageService.getUID())).valueChanges();
  }

  getReviewByMovie(movieID: string): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('movieId', '==', movieID)).valueChanges();
  }

  getReviewByUserID(userID: string): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', ref => ref.where('user', '==', userID)).valueChanges()
  }
}
