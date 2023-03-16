import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilteredUsersPipe } from 'src/app/shared/pipes/filtered-users/filtered-users.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tp-fil-rouge-profiles',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    FilteredUsersPipe,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [UserService],
})
export class ProfilesComponent {
  constructor(private usersService: UserService) {}

  public queryControl = new FormControl('', { nonNullable: true });
  public currentUser = localStorage.getItem('uid');
  public users$ = this.usersService.getAllUsers();
}
