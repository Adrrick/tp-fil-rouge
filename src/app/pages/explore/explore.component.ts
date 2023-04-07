import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tp-fil-rouge-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  genres$ = this.movieService.getGenres();

  constructor(private movieService: MoviesService) {
  }
}
