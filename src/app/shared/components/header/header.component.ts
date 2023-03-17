import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'tp-fil-rouge-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public readonly firebaseAuthService: FirebaseAuthService, private readonly router: Router, private readonly storageService: StorageService,
  ) { }

  onClickAvatar(): void {
    this.router.navigate([`/user/${this.storageService.getUID()}`]);
  }
}
