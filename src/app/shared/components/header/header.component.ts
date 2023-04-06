import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tp-fil-rouge-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, AvatarComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public readonly firebaseAuthService: FirebaseAuthService,
  ) { }
}
