import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseAuthService} from "../../shared/services/firebase-auth.service";
import {MatchPasswordDirective} from "../../shared/validators/match-password.directive";

@Component({
  selector: 'tp-fil-rouge-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MatchPasswordDirective]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private authServices: FirebaseAuthService) {
    this.registerForm = fb.group({
      username: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]],
      confirmedPassword: [undefined, [Validators.required]]
      },
      {
        validators: [new MatchPasswordDirective()]
      });
  }

  submit(): void {
    this.authServices.signUpEmail(this.registerForm.controls['email']?.value,
      this.registerForm.controls['password']?.value,
      this.registerForm.controls['username']?.value);
  }
}
