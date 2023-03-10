import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import Movie from 'src/app/models/Movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'tp-fil-rouge-movie-section',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MovieCardComponent],
  templateUrl: './movie-section.component.html',
  styleUrls: ['./movie-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSectionComponent {
  @Input() title!: string
  @Input() movies!: Movie[]
}
