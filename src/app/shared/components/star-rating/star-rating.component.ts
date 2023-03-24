import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  standalone: true,
  selector: 'tp-fil-rouge-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating!: number;
  @Output() ratingChanged = new EventEmitter<number>();

  onRatingChanged(rating: number) {
    this.rating = rating;
    this.ratingChanged.emit(rating);
  }

}
