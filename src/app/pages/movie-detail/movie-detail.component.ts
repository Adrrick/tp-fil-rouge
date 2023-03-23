import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import MovieDetails from 'src/app/models/Movie-details';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'tp-fil-rouge-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MoviesService, ToastService],
})
export class MovieDetailComponent implements OnInit {
  movie$: Observable<MovieDetails> | undefined;

  constructor(
    private moviesServices: MoviesService,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie$ = this.moviesServices.getMovieDetails(id);
    }
  }

  public onSuccess() {
    this.toast.toastSuccess('test', 'ok');
  }
}
