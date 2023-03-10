import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import User from "../../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) {
  }

  createUser(username: string, uid: string): Observable<User | undefined> {
    this.afs.collection<User>('/users').doc(uid).set({username, uid, moviesSeen: []}).then();
    return this.getUserByUID(uid);
  }

  getUserByUID(uid: string): Observable<User | undefined> {
    return this.afs.collection<User>('/users').doc(uid).valueChanges();
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.afs.collection<User>('/users', ref => ref.where('username', '==', username)).valueChanges()
  }
}