import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieCardComponent } from './movie-card.component';
import movies from 'src/app/fixtures/movies.fixture';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;

    const movie = movies[0];

    component.id = movie.id;
    component.poster_path = movie.poster_path;
    component.title = movie.title;
    component.vote_average = movie.vote_average;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
