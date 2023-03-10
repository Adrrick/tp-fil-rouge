import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'tp-fil-rouge-profiles',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [UserService],
})
export class ProfilesComponent {
  constructor(private usersService: UserService) {}

  users$ = this.usersService.getAllUsers();
}
