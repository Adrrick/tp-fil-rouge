import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirebaseAuthService} from "../../shared/services/firebase-auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'tp-fil-rouge-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FirebaseAuthService, AngularFireDatabase]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private authServices: FirebaseAuthService) {
    this.loginForm = fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]]
    });
  }

  submit(): void {
    this.authServices.loginEmail(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
  }

}
