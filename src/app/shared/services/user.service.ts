import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import User from '../../models/User';
import {lastValueFrom, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  createUser(username: string, uid: string): Observable<User | undefined> {
    this.afs
      .collection<User>('/users')
      .doc(uid)
      .set({ username, uid, moviesSeen: [] })
      .then();
    return this.getUserByUID(uid);
  }

  getUserByUID(uid: string): Observable<User | undefined> {
    return this.afs.collection<User>('/users').doc(uid).valueChanges();
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.afs
      .collection<User>('/users', (ref) =>
        ref.where('username', '==', username)
      )
      .valueChanges();
  }

  getAllUsers() {
    return this.afs.collection<User>('/users').valueChanges();
  }

  async addMovieToMoviesList(userID: string | undefined, movie: { movieId: string, posterPath: string }) {
    const movies = await lastValueFrom(this.afs.collection<User>('/users').doc(userID).valueChanges().pipe(map(response => response?.moviesSeen)));
    const moviesSeen = movies ? movies : [];
    const isSeen = moviesSeen.find(movie_ => movie_.movieId === movie.movieId);
    if(!isSeen) {
      await this.afs.collection<User>('/users').doc(userID).update({moviesSeen});
      return true;
    }
    return false;
  }
}
