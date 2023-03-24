import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import MovieSeen from 'src/app/models/MovieSeen';

@Component({
  selector: 'tp-fil-rouge-light-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './light-movie-card.component.html',
  styleUrls: ['./../movie-card/movie-card.component.scss'],
})
export class LightMovieCardComponent {
  @Input() movieSeen!: MovieSeen;
}
