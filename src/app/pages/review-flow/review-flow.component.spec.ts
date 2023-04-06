import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFlowComponent } from './review-flow.component';

describe('ReviewFlowComponent', () => {
  let component: ReviewFlowComponent;
  let fixture: ComponentFixture<ReviewFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
