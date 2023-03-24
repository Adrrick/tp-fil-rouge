import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightMovieCardComponent } from './light-movie-card.component';

describe('LightMovieCardComponent', () => {
  let component: LightMovieCardComponent;
  let fixture: ComponentFixture<LightMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightMovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LightMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
