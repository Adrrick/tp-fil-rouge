import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import User from 'src/app/models/User';

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
    private afstorage: AngularFireStorage
  ) {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (!firebaseUser) return;

      this.userServices.getUserByUID(firebaseUser.uid).subscribe((user) => {
        this.currentUser = user;
        if (user) {
          this.storageService.setLoginData(user.uid);
        }
      });
    });
  }

  async loginEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
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
      });
  }

  async updateProfil(userStore: Partial<User>): Promise<Partial<User>> {
    const checkIsUpdated: Array<boolean> = [];

    if (userStore.email) {
      await this.updateEmail(userStore.email).then((isUpdated) => {
        if (isUpdated) {
          checkIsUpdated.push(true)
        } else {
          checkIsUpdated.push(false)
        }
      });
    }
    if (userStore.username) {
      await this.updateUserName(userStore.username).then((isUpdated) => {
        if (isUpdated) {
          checkIsUpdated.push(true)
        } else {
          checkIsUpdated.push(false)
        }
      });
    }
    if (userStore.password) {
      await this.updatePassword(userStore.password).then((isUpdated) => {
        if (isUpdated) {
          checkIsUpdated.push(true)
        } else {
          checkIsUpdated.push(false)
        }
      });
    }

    if (!checkIsUpdated.includes(false)) {
      delete userStore.password;
      this.userServices.updateUser(userStore.uid as string, userStore);
    } else {
      if (userStore.email || userStore.password) {
        throw new Error('Cette action necessite d\'avoir une connexion plus récente, veuillez vous déconnectez et reconnectez');
      } else {
        throw new Error('Une erreur est survenue lors de la sauvegarde');
      }
    }

    return userStore;
  }

  async updatePhotoProfil(file: File): Promise<boolean> {
    const user = await this.afAuth.currentUser;

    if (user) {
      try {
        let newPhotoUrl = null;
        if (file) {
          newPhotoUrl = await this.uploadImage(file, `user_profile/${user.uid}.png`).catch((err) => {
            throw new Error(err);
          });


        } else {
          throw new Error('Vous devez uploadé un document!');
        }

        const photoURL = {
          photoURL: newPhotoUrl
        };

        const userStore: Partial<User> = {};
        userStore.photoURL = newPhotoUrl;

        await user.updateProfile(photoURL).then(res => {
          this.userServices.updateUser(user.uid, userStore);
        });

        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = this.afstorage.ref(path);

    const imageRef = storageRef.child(`${Date.now()}-${file.name}`);
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

    if (!allowedExtensions.exec(file.name)) {
      throw new Error('Type de fichier non pris en charge');
    }

    const metadata = {
      contentType: file.type,
    };

    try {
      const snapshot = await imageRef.put(file, metadata);

      const downloadUrl = await snapshot.ref.getDownloadURL();

      return downloadUrl;
    } catch (error) {
      return '';
    }
  }

  async updateUserName(newDisplayName: string): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        const profileUpdate = {
          displayName: newDisplayName
        };

        await user.updateProfile(profileUpdate);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }


  async updateEmail(newEmail: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await user.updateEmail(newEmail);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  async updatePassword(newPassword: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await user.updatePassword(newPassword);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
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
