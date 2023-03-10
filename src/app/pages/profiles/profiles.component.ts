import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'tp-fil-rouge-profiles',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule, MatCardModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [UserService],
})
export class ProfilesComponent {
  constructor(private usersService: UserService) {}

  // currentUser$ = this.usersService.getUserByUID();
  users$ = this.usersService.getAllUsers();
}
