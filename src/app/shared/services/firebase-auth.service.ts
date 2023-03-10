import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "./user.service";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  constructor(private readonly afAuth: AngularFireAuth, private readonly userServices: UserService,
              private readonly storageService: StorageService) {
  }

  loginEmail(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((response) => {
      if (response?.user?.uid) {
        this.userServices.getUserByUID(response.user.uid).subscribe((user) => {
          console.log({user});
          if (user?.uid) {
            this.storageService.setLoginData(user?.uid);
          }
        });
      }
    }, (err) => console.log('Error', err));
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
