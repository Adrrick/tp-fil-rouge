import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsMoviesComponent } from './profile-details-movies.component';

describe('ProfileDetailsMoviesComponent', () => {
  let component: ProfileDetailsMoviesComponent;
  let fixture: ComponentFixture<ProfileDetailsMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailsMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
