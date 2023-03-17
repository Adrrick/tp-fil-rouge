import { Component } from '@angular/core';

@Component({
  selector: 'tp-fil-rouge-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css']
})
export class StartRatingComponent {
  rating = 0;

  rateStar(index: number) {
    this.rating = index + 1;
  }
}
