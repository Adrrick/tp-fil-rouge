import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { FilteredUsersPipe } from 'src/app/shared/pipes/filtered-users/filtered-users.pipe';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { UserLineComponent } from 'src/app/shared/components/user-line/user-line.component';

@Component({
  selector: 'tp-fil-rouge-search-users',
  standalone: true,
  imports: [
    CommonModule,
    FilteredUsersPipe,
    ReactiveFormsModule,
    RouterLink,
    SearchBarComponent,
    UserLineComponent,
  ],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent {
  constructor(private usersService: UserService) { }

  public queryControl = new FormControl('', { nonNullable: true });
  public currentUser = localStorage.getItem('uid');
  public users$ = this.usersService.getAllUsers();
}
