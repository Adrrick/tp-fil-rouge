import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "./user.service";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  constructor(private readonly afAuth: AngularFireAuth, private readonly userServices: UserService,
              private readonly storageService: StorageService,
              private readonly router: Router) {
  }

  async loginEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((response) => {
      if (response?.user?.uid) {
        this.userServices.getUserByUID(response.user.uid).subscribe((user) => {
          if (user?.uid) {
            this.storageService.setLoginData(user?.uid);
            this.router.navigate(['/'])
          }
        });
      }
    }, (err) => {
      console.error('Error', err);
    });
  }

  logout() {
    this.storageService.clearStorage();
  }

  signUpEmail(email: string, password: string, username: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response?.user?.uid) {
          response?.user?.updateProfile({displayName: username}).then();
          this.userServices.createUser(username, response.user.uid).subscribe((user) => {
            if (user?.uid) {
              this.storageService.setLoginData(user?.uid);
            }
          });
        }
      })
      .catch((err) => console.log('Error', err));
  }
}
