import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MoviesService } from "../../shared/services/movies.service";
import { MovieSectionComponent } from '../../shared/components/movie-section/movie-section.component';

@Component({
  selector: 'tp-fil-rouge-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, MovieSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MoviesService]
})
export class HomeComponent {
  popularMovies$ = this.movieService.getPopularMovies();
  topRatedMovies$ = this.movieService.getTopRatedMovies();
  upcomingMovies$ = this.movieService.getUpcomingMovies();

  constructor(private movieService: MoviesService) {
  }
}
