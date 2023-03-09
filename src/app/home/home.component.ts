import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MoviesService } from "../shared/services/movies.service";
import { MovieCardComponent } from '../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'tp-fil-rouge-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MoviesService]
})
export class HomeComponent {
  movies$ = this.movieService.getPopular();

  constructor(private movieService: MoviesService) {
  }

  goDetails(id: number): void {
    console.log({ id });
  }

}
