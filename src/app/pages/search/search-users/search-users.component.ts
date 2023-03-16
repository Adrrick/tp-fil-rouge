import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FilteredUsersPipe } from 'src/app/shared/pipes/filtered-users/filtered-users.pipe';

@Component({
  selector: 'tp-fil-rouge-search-users',
  standalone: true,
  imports: [CommonModule, MatDividerModule,
    MatListModule,
    MatCardModule,
    FilteredUsersPipe,
    ReactiveFormsModule,
    MatButtonModule,],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent {
  constructor(private usersService: UserService) { }

  public queryControl = new FormControl('', { nonNullable: true });
  public currentUser = localStorage.getItem('uid');
  public users$ = this.usersService.getAllUsers();
}
