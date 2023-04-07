import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import Movie from 'src/app/models/Movie';


@Component({
  selector: 'tp-fil-rouge-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() id!: Movie['id'];
  @Input() poster_path!: Movie['poster_path'];
  @Input() title!: Movie['title'];
  @Input() vote_average!: Movie['vote_average'];
}
