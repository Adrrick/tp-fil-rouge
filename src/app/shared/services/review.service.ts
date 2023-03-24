import { Injectable } from '@angular/core';
import {lastValueFrom, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {StorageService} from "./storage.service";
import Review from "../../models/Review";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private afs: AngularFirestore, private storageService: StorageService, private userService: UserService) { }

  async createReview(movie: { movieId: string, posterPath: string}, rating: number, comment: string, title: string): Promise<boolean> {
    const user = this.getUserRefs(this.storageService.getUID());

    const isRated = await lastValueFrom(this.afs
      .collection<Review>('/reviews', (ref) => ref.where('user', '==', user).where('movieId', '==', movie.movieId))
      .valueChanges()
      .pipe(map(reviews => reviews.length > 0)));
    if(isRated) {
      return false;
    } else {
      await this.afs.collection<Review>('/reviews').add({movieId: movie.movieId, comment, rating, user, title});
      await this.userService.addMovieToMoviesList(user, movie);
      return true;
    }
  }

  getReviewByUser(): Observable<Review[]> {
    const user = this.getUserRefs(this.storageService.getUID());
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('user', '==', user)).valueChanges();
  }

  getReviewByMovie(movieID: string): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', (ref) => ref.where('movieId', '==', movieID)).valueChanges();
  }

  getReviewByUserID(userID: string): Observable<Review[]> {
    return this.afs.collection<Review>('/reviews', ref => ref.where('user', '==', this.getUserRefs(userID))).valueChanges()
  }

  private getUserRefs(uid: string | null) {
    return `/users/${uid}`;
  }
}
