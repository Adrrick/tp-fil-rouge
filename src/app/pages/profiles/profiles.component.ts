import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilteredUsersPipe } from 'src/app/shared/pipes/filtered-users/filtered-users.pipe';

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
  ],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [UserService],
})
export class ProfilesComponent {
  constructor(private usersService: UserService) {}

  public users$ = this.usersService.getAllUsers();
  public queryControl = new FormControl('', { nonNullable: true });
  public currentUser = this.getCurrentUser();

  getCurrentUser() {
    const currentUserUID = localStorage.getItem('uid');
    if (!currentUserUID) {
      return;
    }
    return this.usersService.getUserByUID(currentUserUID);
  }
}
