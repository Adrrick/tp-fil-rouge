import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from "../../shared/services/movies.service";
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";


@Component({
  selector: 'tp-fil-rouge-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MoviesService]
})
export class MovieDetailComponent implements OnInit {
  movie$: Observable<any> | undefined;

  constructor(private moviesServices: MoviesService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie$ = this.moviesServices.getMovieDetails(id);
    }
  }
}
