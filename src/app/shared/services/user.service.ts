import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import User from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  createUser(username: string, uid: string) {
    this.afs.collection<User>('/users').doc(uid).set({username, moviesSeen: []}).then();
    return this.getUserByUID(uid);
  }

  getUserByUID(uid: string) {
    return this.afs.collection<User>('/users').doc(uid).get();
  }
}