import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import reviews from 'src/app/fixtures/reviews.fixture';
import users from 'src/app/fixtures/users.fixture';
import { ReviewService } from 'src/app/shared/services/review.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewFlowComponent } from './review-flow.component';

describe('ReviewFlowComponent', () => {
  let component: ReviewFlowComponent;
  let fixture: ComponentFixture<ReviewFlowComponent>;
  let reviewServiceMock: Partial<ReviewService>;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    reviewServiceMock = {
      getFlowReviews: jest.fn().mockReturnValue(of(reviews))
    };

    userServiceMock = {
      getUserByUID: jest.fn().mockReturnValue(of(users[0])),
    }

    await TestBed.configureTestingModule({
      imports: [ReviewFlowComponent, RouterTestingModule],
      providers: [
        { provide: ReviewService, useValue: reviewServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
