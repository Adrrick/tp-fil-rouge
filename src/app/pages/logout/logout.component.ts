import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from "../../shared/services/firebase-auth.service";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tp-fil-rouge-logout',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private readonly router: Router,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) { }

  public ngOnInit(): void {
    this.firebaseAuthService.logout();
    this.router.navigate(['/home'])
  }

}
