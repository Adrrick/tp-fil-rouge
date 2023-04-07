import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import MovieSeen from 'src/app/models/MovieSeen';
import { MovieCardComponent } from 'src/app/shared/components/movie-card/movie-card.component';

@Component({
  selector: 'tp-fil-rouge-profile-details-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, RouterLink, MovieCardComponent],
  templateUrl: './profile-details-movies.component.html',
  styleUrls: ['./profile-details-movies.component.scss'],
})
export class ProfileDetailsMoviesComponent {
  @Input() moviesSeen?: MovieSeen[];
}
