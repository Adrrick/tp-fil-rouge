import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { first, Observable } from 'rxjs';
import PopularMoviesResult from 'src/app/models/PopularMoviesResult';
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Pagination } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'tp-fil-rouge-explore-details',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MatPaginatorModule],
  templateUrl: './explore-details.component.html',
  styleUrls: ['./explore-details.component.scss'],
})
export class ExploreDetailsComponent extends Pagination implements OnInit {
  movies$?: Observable<PopularMoviesResult>;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
    super(route);
  }

  ngOnInit(): void {
    this.fetchMovies()
  }

  fetchMovies() {
    const with_genres = this.route.snapshot.queryParamMap.get('with_genres');
    if (with_genres) {
      this.movies$ = this.moviesService.getMoviesDiscover({ with_genres, page: this.currentPage });

      this.movies$.pipe(first()).subscribe((movies) => {
        this.totalItems = movies.total_results;
      })
    }
  }

  onPageChange(): void {
    this.fetchMovies();
  }
}
