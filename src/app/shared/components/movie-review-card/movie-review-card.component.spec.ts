import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import reviews from 'src/app/fixtures/reviews.fixture';
import { MovieReviewCardComponent } from './movie-review-card.component';

describe('MovieReviewCardComponent', () => {
  let component: MovieReviewCardComponent;
  let fixture: ComponentFixture<MovieReviewCardComponent>;

  const review = reviews[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewCardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieReviewCardComponent);
    component = fixture.componentInstance;
    component.review = review;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
