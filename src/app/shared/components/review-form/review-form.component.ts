import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReviewService } from "../../services/review.service";

@Component({
  selector: 'tp-fil-rouge-review-form',
  templateUrl: './review-form.component.html',
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
}
