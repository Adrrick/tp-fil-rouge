import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import MovieDetails from 'src/app/models/Movie-details';

@Component({
  selector: 'tp-fil-rouge-profile-details-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details-movies.component.html',
  styleUrls: ['./profile-details-movies.component.scss'],
})
export class ProfileDetailsMoviesComponent implements OnInit {
  @Input() user?: User;
  viewedMovies$?: Observable<MovieDetails[]>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      console.log(this.user);
    }
  }
}
