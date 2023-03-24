import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReviewService } from "../../services/review.service";
import { StarRatingComponent } from "../star-rating/star-rating.component";

@Component({
  standalone: true,
  selector: 'tp-fil-rouge-review-form',
  templateUrl: './review-form.component.html',
  imports: [StarRatingComponent, ReactiveFormsModule],
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  reviewForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      title: [undefined, [Validators.required, Validators.minLength(4)]],
      rating: [undefined, [Validators.required, Validators.min(0), Validators.max(5)]],
      comment: ['']
    });
  }


  submit() {
    console.log(this.reviewForm);
  }

  onRatingChanged($event: any) {
    console.log($event)
  }
}
