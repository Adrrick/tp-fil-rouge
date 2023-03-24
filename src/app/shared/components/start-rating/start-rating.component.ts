import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tp-fil-rouge-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css']
})
export class StartRatingComponent {
  @Input() rating: number;
  @Output() ratingChanged = new EventEmitter<number>();

  onRatingChanged(rating: number) {
    this.rating = rating;
    this.ratingChanged.emit(rating);
  }

}
