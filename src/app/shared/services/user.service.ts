import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import User from '../../models/User';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) { }

  createUser(
    username: string,
    email: string,
    uid: string
  ): Observable<User | undefined> {
    this.afs
      .collection<User>('/users')
      .doc(uid)
      .set({ username, email, uid, moviesSeen: [] })
      .then();
    return this.getUserByUID(uid);
  }

  updateUser(
    uid: string,
    updatedUserData: Partial<User>
  ): Observable<User | undefined> {
    const userRef = this.afs.collection<User>('/users').doc(uid);

    userRef.update(updatedUserData)
      .then(() => {
        console.log('User updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
      });

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

  async addMovieToMoviesList(userID: string | undefined, movie: { movieId: number, posterPath: string, title: string }) {
    const movies = await firstValueFrom(this.afs.collection<User>('/users').doc(userID).valueChanges().pipe(map(response => response?.moviesSeen)));
    const moviesSeen = movies ? movies : [];
    const isSeen = moviesSeen.find(movie_ => movie_.movieId === movie.movieId);
    if(!isSeen) {
      moviesSeen.push(movie);
      await this.afs.collection<User>('/users').doc(userID).update({moviesSeen});
      return true;
    }
    return false;
  }
}
