import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import movies from 'src/app/fixtures/movies.fixture';
import moviesDetails from 'src/app/fixtures/movies-details.fixture';
import genres from 'src/app/fixtures/genres.fixture';
import { TranslateService } from '@ngx-translate/core';


describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  let translateServiceMock: Partial<TranslateService>;


  beforeEach(() => {
    translateServiceMock = {
      currentLang: 'en',
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ]
    });
    service = TestBed.inject(MoviesService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return popular popular movies', (done) => {
    const expectedData = { results: movies, page: 1, total_pages: 1, total_results: 1 };

    const popularMovies$ = service.getPopularMovies();

    popularMovies$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('movie/popular'));
    mockRequest.flush(expectedData);
  });

  it('should return top rated movies', (done) => {
    const expectedData = { results: movies, page: 1, total_pages: 1, total_results: 1 };

    const topRatedMovies$ = service.getTopRatedMovies();

    topRatedMovies$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('movie/top_rated'));
    mockRequest.flush(expectedData);
  });

  it('should return upcoming movies', (done) => {
    const expectedData = { results: movies, page: 1, total_pages: 1, total_results: 1 };

    const upcomingMovies$ = service.getUpcomingMovies();

    upcomingMovies$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('movie/upcoming'));
    mockRequest.flush(expectedData);
  });

  it('should return movie details', (done) => {
    const expectedData = moviesDetails[0];

    const movieDetails$ = service.getMovieDetails(expectedData.id);

    movieDetails$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted(`movie/${expectedData.id}`));
    mockRequest.flush(expectedData);
  });

  it('should return searched movies', (done) => {
    const expectedData = { results: movies, page: 1, total_pages: 1, total_results: 1 };
    const params = { query: "Spider" };

    const searchedMovies$ = service.searchMovies(params);

    searchedMovies$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('search/movie', params));
    mockRequest.flush(expectedData);
  });

  it('should return genres', (done) => {
    const expectedData = { genres: genres };

    const genres$ = service.getGenres();

    genres$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('genre/movie/list'));
    mockRequest.flush(expectedData);
  });

  it('should return movies discover', (done) => {
    const expectedData = { results: movies, page: 1, total_pages: 1, total_results: 1 };
    const params = { with_genres: genres[0].id };

    const moviesDiscover$ = service.getMoviesDiscover(params);

    moviesDiscover$.subscribe(res => {
      expect(res).toEqual(expectedData);

      done();
    });

    const mockRequest = httpMock.expectOne(service.getUrlFormatted('discover/movie', params));
    mockRequest.flush(expectedData);
  });

  it('should transform params to query params with the api key', () => {
    const params = { query: "Spider" }
    const expectedData = `query=Spider&api_key=${service.apiKey}&language=${translateServiceMock.currentLang}`;

    expect(service.createQueryParams(params)).toEqual(expectedData);
  })

  it('should format the url', () => {
    const url = 'search/movie'
    const params = { query: "Spider" }

    const expectedUrl = `${service.baseUrl}search/movie?query=Spider&api_key=${service.apiKey}&language=${translateServiceMock.currentLang}`;

    expect(service.getUrlFormatted(url, params)).toEqual(expectedUrl);
  })
});
