import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { SearchUsersComponent } from './search-users/search-users.component';


@Component({
  selector: 'tp-fil-rouge-search',
  standalone: true,
  imports: [CommonModule, MatTabsModule, SearchMoviesComponent, SearchUsersComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
}
