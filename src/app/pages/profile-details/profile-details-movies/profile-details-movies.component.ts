import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import MovieSeen from 'src/app/models/MovieSeen';

@Component({
  selector: 'tp-fil-rouge-profile-details-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details-movies.component.html',
  styleUrls: ['./profile-details-movies.component.scss'],
})
export class ProfileDetailsMoviesComponent implements OnInit {
  @Input() movies?: MovieSeen[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private usersService: UserService
  ) {}

  ngOnInit() {
    console.log(this.movies);
  }
}
