import {Component, Input} from '@angular/core';
import Review from "../../../models/Review";
import {NgForOf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'tp-fil-rouge-movie-details-reviews',
  templateUrl: './movie-details-reviews.component.html',
  styleUrls: ['./movie-details-reviews.component.scss'],
  imports: [
    NgForOf
  ]
})
export class MovieDetailsReviewsComponent {
  @Input() reviews?: Review[];
}
