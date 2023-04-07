import { Component, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ToastService } from '../../services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'tp-fil-rouge-review-form',
  templateUrl: './review-form.component.html',
  imports: [StarRatingComponent, ReactiveFormsModule, TranslateModule],
  styleUrls: ['./review-form.component.scss'],
  providers: [ToastService],
})
export class ReviewFormComponent {
  @Input() movie!: { movieId: number; posterPath: string; title: string };
  @Output()
  reviewForm: FormGroup;
  send = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly reviewService: ReviewService,
    private toast: ToastService
  ) {
    this.reviewForm = this.fb.group({
      title: [undefined, [Validators.required, Validators.minLength(4)]],
      rating: [
        undefined,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      comment: [''],
    });
  }

  async submit() {
    this.send = false;
    if (this.reviewForm.invalid) {
      return;
    }
    await this.reviewService
      .createReview(
        this.movie,
        this.reviewForm.controls['rating'].value,
        this.reviewForm.controls['comment'].value,
        this.reviewForm.controls['title'].value
      )
      .then((r) => {
        // this.send;
        if (r) {
          this.toast.toastSuccess('Votre commentaire à bien été publié');
        } else {
          this.toast.toastError('Votre commentaire n\'a pas pu être publié');
        }
      })
      .catch((err) => {
        this.toast.toastError(err.message);
      });
  }

  onRatingChanged($event: number) {
    this.reviewForm.controls['rating'].setValue($event);
  }
}
