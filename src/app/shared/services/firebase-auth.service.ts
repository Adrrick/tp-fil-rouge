import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import Firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  currentUser: User | undefined = undefined;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly userServices: UserService,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (!firebaseUser) return;

      this.userServices.getUserByUID(firebaseUser.uid).subscribe((user) => {
        this.currentUser = user;
        if (user) {
          this.storageService.setLoginData(user.uid);
        }
      })
    });
  }


  async loginEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        if (response?.user?.uid) {
          this.userServices
            .getUserByUID(response.user.uid)
            .subscribe((user) => {
              if (user?.uid) {
                this.storageService.setLoginData(user?.uid);
                this.router.navigate(['/']).then();
              }
            });
        }
      }
    );
  }

  logout() {
    this.storageService.clearStorage();
    this.currentUser = undefined;
  }

  signUpEmail(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response?.user?.uid) {
          response?.user?.updateProfile({ displayName: username }).then();
          this.userServices
            .createUser(username, email, response.user.uid)
            .subscribe((user) => {
              if (user?.uid) {
                this.storageService.setLoginData(user?.uid);
                this.router.navigate(['/']).then();
              }
            });
        }
      });
  }
}
