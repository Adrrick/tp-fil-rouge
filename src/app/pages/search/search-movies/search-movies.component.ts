import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import MoviesListResult from 'src/app/models/MoviesListResult';

@Component({
  selector: 'tp-fil-rouge-search-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieCardComponent, SearchBarComponent],
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
})
export class SearchMoviesComponent {
  searchMoviesFormControl: FormControl<string>;

  movies$?: Observable<MoviesListResult>;

  constructor(private readonly moviesService: MoviesService) {
    this.searchMoviesFormControl = new FormControl('', { nonNullable: true })

    this.onSearchTermChange()
  }

  public onSearchTermChange() {
    this.searchMoviesFormControl.valueChanges.subscribe(value => {
      if (value.trim() !== '') {
        this.movies$ = this.moviesService.searchMovies(value)
      }
    })
  }
}
