import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  constructor(private readonly afAuth: AngularFireAuth) { }

  loginEmail(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log({response});
        // TODO use localStorage for accessToken & uid
      }).catch((err) => {
       console.log({err});
       // TODO login failed handler
    });
  }

  logout() {
    // TODO handle logout
  }

  // TODO
  signUpEmail(email: string, password: string, username: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log({SignUp: 'SignUp', response});
        response.user?.updateProfile({displayName: username});
        //TODO get info
      })
      .catch((error) => {
        console.log({error});
      });
  }
}
