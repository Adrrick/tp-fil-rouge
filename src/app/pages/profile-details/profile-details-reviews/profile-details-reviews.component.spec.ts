import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsReviewsComponent } from './profile-details-reviews.component';

describe('ProfileDetailsReviewsComponent', () => {
  let component: ProfileDetailsReviewsComponent;
  let fixture: ComponentFixture<ProfileDetailsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailsReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
