import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewCardComponent } from './movie-review-card.component';

describe('MovieReviewCardComponent', () => {
  let component: MovieReviewCardComponent;
  let fixture: ComponentFixture<MovieReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
