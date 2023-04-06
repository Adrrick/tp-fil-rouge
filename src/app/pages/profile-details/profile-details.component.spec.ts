import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import users from 'src/app/fixtures/users.fixture';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileDetailsComponent } from './profile-details.component';
import { of } from 'rxjs'
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { ReviewService } from 'src/app/shared/services/review.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import reviews from 'src/app/fixtures/reviews.fixture';
import { TranslateService } from '@ngx-translate/core';

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;
  let userServiceMock: Partial<UserService>;
  let storageServiceMock: Partial<StorageService>;
  let firebaseAuthServiceMock: Partial<FirebaseAuthService>;
  let reviewServiceMock: Partial<ReviewService>;
  // let formBuilderMock: Partial<FormBuilder>;
  let toastServiceMock: Partial<ToastService>;
  let matDialogMock: Partial<MatDialog>;
  let matSnackBarMock: Partial<MatSnackBar>;
  let translateServiceMock: Partial<TranslateService>;

  const user = users[0];

  beforeEach(async () => {
    userServiceMock = {
      getUserByUID: jest.fn().mockReturnValue(of(user))
    }

    storageServiceMock = {
      getUID: jest.fn().mockReturnValue(user.uid)
    }

    reviewServiceMock = {
      getReviewByUserID: jest.fn().mockReturnValue(of(reviews))
    }

    await TestBed.configureTestingModule({
      imports: [ProfileDetailsComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: FirebaseAuthService, useValue: firebaseAuthServiceMock },
        { provide: ReviewService, useValue: reviewServiceMock },
        // { provide: FormBuilder, useValue: formBuilderMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
        { provide: TranslateService, useValue: translateServiceMock },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(storageServiceMock.getUID).toHaveBeenCalled();

    expect(userServiceMock.getUserByUID).toHaveBeenCalledWith(user.uid);
  });
});
