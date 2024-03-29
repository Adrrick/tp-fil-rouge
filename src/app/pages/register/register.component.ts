import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseAuthService } from '../../shared/services/firebase-auth.service';
import { MatchPasswordDirective } from '../../shared/validators/match-password.directive';
import { UserService } from '../../shared/services/user.service';
import { RouterModule } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tp-fil-rouge-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MatchPasswordDirective, ToastService],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private authServices: FirebaseAuthService,
    private userServices: UserService,
    private toast: ToastService
  ) {
    this.registerForm = fb.group(
      {
        username: ['', [Validators.required]],
        email: [undefined, [Validators.required, Validators.email]],
        password: [undefined, [Validators.required]],
        confirmedPassword: [undefined, [Validators.required]],
      },
      {
        validators: [new MatchPasswordDirective()],
      }
    );
  }

  async submit(): Promise<void> {
    const usernameCondition = await new Promise((resolve) => {
      this.userServices
        .getUserByUsername(this.registerForm.controls['username']?.value)
        .subscribe((users) => {
          resolve(users.length > 0);
        });
    });
    if (!usernameCondition) {
      this.authServices
        .signUpEmail(
          this.registerForm.controls['email']?.value,
          this.registerForm.controls['password']?.value,
          this.registerForm.controls['username']?.value
        )
        .catch((err) => {
          this.toast.toastError(err.message);
        });
    } else {
      this.toast.toastError('Username already used');
    }
  }
}
