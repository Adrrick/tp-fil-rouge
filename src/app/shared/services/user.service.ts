import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import User from "../../models/User";
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  createUser(username: string, uid: string): Observable<firebase.firestore.DocumentSnapshot<User>> {
    this.afs.collection<User>('/users').doc(uid).set({username, moviesSeen: []}).then();
    return this.getUserByUID(uid);
  }

  getUserByUID(uid: string): Observable<firebase.firestore.DocumentSnapshot<User>> {
    return this.afs.collection<User>('/users').doc(uid).get();
  }
}