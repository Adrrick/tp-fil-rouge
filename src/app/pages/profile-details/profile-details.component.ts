import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import User from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileDetailsMoviesComponent } from './profile-details-movies/profile-details-movies.component';
import { ProfileDetailsReviewsComponent } from './profile-details-reviews/profile-details-reviews.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import Review from 'src/app/models/Review';
import { ReviewService } from 'src/app/shared/services/review.service';
import MovieSeen from 'src/app/models/MovieSeen';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { DragDropDirective } from 'src/app/shared/directives/drag-drop.directive';
import { MatMenuModule } from '@angular/material/menu';
import { WebcamComponent } from 'src/app/shared/components/webcam/webcam.component';
import { getFileFromBase64 } from 'src/app/shared/function/get-file-from-b64.function';
import {
  WebcamImage,
  WebcamModule,
} from 'ngx-webcam';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tp-fil-rouge-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    ProfileDetailsMoviesComponent,
    ProfileDetailsReviewsComponent,
    MatIconModule,
    DragDropDirective,
    MatMenuModule,
    WebcamComponent,
    MatDialogModule,
    WebcamModule,
    TranslateModule,
  ],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [ToastService],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  user$?: Observable<User | undefined>;
  reviews$?: Observable<Review[]>;
  userSubscription?: Subscription;
  reviewsSubscription?: Subscription;
  viewedMovies?: MovieSeen[];
  reviewedMovies?: Review[];

  public isMe = false;

  public currentUser?: User;

  public profilForm!: FormGroup;

  public userUpdated: Partial<User> = {};

  public openWebcam = false;

  public imgtest = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService,
    private afAuth: FirebaseAuthService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private toast: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id =
      this.route.snapshot.paramMap.get('id') || this.storageService.getUID();
    if (id) {
      if (id === this.storageService.getUID()) {
        this.isMe = true;
      } else {
        this.isMe = false;
      }
      this.user$ = this.userService.getUserByUID(id);
      this.userSubscription = this.user$.subscribe((user) => {
        this.viewedMovies = user?.moviesSeen;
        this.currentUser = user;
        this.userUpdated.uid = user?.uid;
        this.profilForm = this.fb.group({
          username: new FormControl(user?.username, [
            Validators.required,
            Validators.minLength(4),
          ]),
          email: new FormControl(user?.email, [Validators.minLength(4)]),
          newPassword: new FormControl(undefined, [Validators.minLength(4)]),
        });
      });
      this.reviews$ = this.reviewService.getReviewByUserID(id);
      this.reviews$.subscribe((reviews) => {
        this.reviewedMovies = reviews;
      });
    }
    if (!this.user$) {
      this.router.navigate(['/error?error_key=user_not_found']);
    }
  }

  public updateAvatar(file: FileList) {
    if (file[0].type !== 'image/jpeg' && file[0].type !== 'image/png') {
      this.toast.toastError(
        'Nous supportons seulement les images de type png et jpeg'
      );
      return;
    }
    if (file[0].size >= 2000000) {
      this.toast.toastError('Votre image est supérieur à 2mo');
      return;
    }

    // const reader = new FileReader();
    // reader.addEventListener('loadend', (event) => {
    //   this.userUpdated.photoURL = event?.target?.result?.toString();
    // });

    // reader.readAsDataURL(file[0]);

    this.afAuth
      .updatePhotoProfil(file[0])
      .then((res) => {
        this.toast.toastSuccess('Votre photo à bien été mis à jour');
      })
      .catch((err) => {
        this.toast.toastSuccess(
          'Un problème est survenue lors de la sauvegarde de votre photo de profil'
        );
      });
  }

  public onSubmit() {
    if (this.isMe) {
      if (this.profilForm.get('username')?.dirty) {
        this.userUpdated.username = this.profilForm.get('username')?.value;
      }
      if (this.profilForm.get('email')?.dirty) {
        this.userUpdated.email = this.profilForm.get('email')?.value;
      }
      if (this.profilForm.get('newPassword')?.dirty) {
        this.userUpdated.password = this.profilForm.get('newPassword')?.value;
      }

      return this.afAuth
        .updateProfil(this.userUpdated)
        .then((user) => {
          this.toast.toastSuccess('Votre profil à bien été enregistré.');
        })
        .catch((err) => {
          this.toast.toastError(err.message);
        });
    } else {
      return this.toast.toastError(
        "Vous ne pouvez pas modifier le profil d'un autre utilisateur"
      );
    }
  }

  openCameraModal(): void {
    const dialogRef = this.dialog.open(WebcamComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result instanceof WebcamImage) {
        const file = await getFileFromBase64(result.imageAsDataUrl, 'image/jpeg');
        const files = Array.from([file]) as File[];
        const dataTransfer = new DataTransfer();
        for (const file of files) {
          dataTransfer.items.add(file);
        }
        const fileList: FileList = dataTransfer.files;

        return this.updateAvatar(fileList);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }
}
