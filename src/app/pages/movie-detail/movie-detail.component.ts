import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import MovieDetails from 'src/app/models/Movie-details';
import { Observable } from "rxjs";
import {ReviewFormComponent} from "../../shared/components/review-form/review-form.component";


@Component({
  selector: 'tp-fil-rouge-movie-detail',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MoviesService],
})
export class MovieDetailComponent implements OnInit {
  movie$: Observable<MovieDetails> | undefined;

  constructor(
    private moviesServices: MoviesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie$ = this.moviesServices.getMovieDetails(id);
    }
  }
}
