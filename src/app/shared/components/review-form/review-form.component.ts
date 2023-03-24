import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReviewService } from "../../services/review.service";
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  standalone: true,
  selector: 'tp-fil-rouge-review-form',
  templateUrl: './review-form.component.html',
  imports: [StarRatingComponent, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule],
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() movie!: { movieId: number, posterPath: string, title: string }
  @Output()

  reviewForm: FormGroup;
  send = false;

  constructor(private readonly fb: FormBuilder, private readonly reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      title: [undefined, [Validators.required, Validators.minLength(4)]],
      rating: [undefined, [Validators.required, Validators.min(0), Validators.max(5)]],
      comment: ['']
    });
  }


  async submit() {
    // this.reviewService.getReviewByUser().subscribe(r => console.log(r));
    this.send = false;
    // console.log(this.reviewForm);
    if (this.reviewForm.invalid) {
      return;
    }
    await this.reviewService.createReview(this.movie, this.reviewForm.controls['rating'].value,
      this.reviewForm.controls['comment'].value, this.reviewForm.controls['title'].value).then(r => {
        // this.send;
        console.log(r);
      });
  }

  onRatingChanged($event: number) {
    this.reviewForm.controls['rating'].setValue($event);
  }
}
