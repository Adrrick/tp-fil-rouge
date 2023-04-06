import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import Review from 'src/app/models/Review';
import { ReviewService } from 'src/app/shared/services/review.service';

@Component({
  selector: 'tp-fil-rouge-review-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-flow.component.html',
  styleUrls: ['./review-flow.component.scss'],
})
export class ReviewFlowComponent implements OnInit {

  constructor(
    private reviewService: ReviewService,
  ) { }

  flow$?: Observable<Review[]>;

  public ngOnInit(): void {
    this.flow$ = this.reviewService.getFlowReviews();
  }

}
