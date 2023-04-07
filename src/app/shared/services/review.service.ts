import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, switchMap } from "rxjs";
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
    const user = !this.storageService.getUID() ? ' ' : this.storageService.getUID();

    const isRated = await firstValueFrom(this.afs
      .collection<Review>('/reviews', (ref) => ref.where('movieId', '==', movie.movieId).where('user', '==', user))
      .valueChanges()
      .pipe(map(reviews => reviews.length > 0)));

    if (isRated) {
      return false;
    }

    const created_at = new Date().getTime();
    await this.afs.collection<Review>('/reviews').add({ movieId: movie.movieId, movieTitle: movie.title, comment, rating, user, title, created_at });
    await this.userService.addMovieToMoviesList(user, movie);
    return true;
  }

  getReviewByUser(): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('user', '==', this.storageService.getUID())).valueChanges();
  }

  getReviewByMovie(movieID: number): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('movieId', '==', movieID)).valueChanges();
  }

  getReviewByUserID(userID: string): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', ref => ref.where('user', '==', userID)).valueChanges();
  }

  removeReview(movieId: number, user: string): Observable<void[]> {
    return this.afs.collection<Review>('/reviews', ref => ref.where('user', '==', user).where('movieId', '==', movieId)).get().pipe(
      switchMap(querySnapshot => {
        if (querySnapshot.size > 0) {
          const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
          return Promise.all(deletePromises);
        } else {
          return Promise.reject("Document not found.");
        }
      })
    );
  }

  getFlowReviews(): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.orderBy('created_at', 'desc')).valueChanges();
  }
}