import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Movie from 'src/app/models/Movie';
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';
import MoviesListResult from 'src/app/models/MoviesListResult';

@Component({
  selector: 'tp-fil-rouge-explore-details',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './explore-details.component.html',
  styleUrls: ['./explore-details.component.scss'],
})
export class ExploreDetailsComponent implements OnInit {
  movies$?: Observable<MoviesListResult>;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    const with_genres = this.route.snapshot.queryParamMap.get('with_genres');
    if (with_genres) {
      this.movies$ = this.moviesService.getMoviesDiscover({ with_genres });

      console.log(this.movies$)
    }

  }
}
