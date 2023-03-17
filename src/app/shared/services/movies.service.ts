import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineLatest, map, Observable} from "rxjs";
import * as QueryString from 'qs';
import MovieDetails from 'src/app/models/Movie-details';
import MoviesListResult from 'src/app/models/MoviesListResult';
import {environment} from "../../../environments/environment";
import MovieImagesResult from "../../models/MovieImagesResult";
import MovieCreditsResult from "../../models/MovieCreditsResult";
import KeywordResult from "../../models/KeywordResult";
import Genres from 'src/app/models/Genres';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = environment.api.baseUrl;
  apiKey = environment.api.apiKey;

  constructor(private httpClient: HttpClient) {
  }

  public getPopular(): Observable<MoviesListResult> {
    return this.call(`movie/popular`)
  }

  public getPopularMovies(): Observable<MoviesListResult> {
    return this.call(`movie/popular`)
  }

  public getTopRatedMovies(): Observable<MoviesListResult> {
    return this.call(`movie/top_rated`)
  }

  public getMovieDetails(id: string): Observable<MovieDetails> {
    return this.call(`movie/${id}`)
  }

  public searchMovies(query: string): Observable<MoviesListResult> {
    return this.call(`search/movie`, { query })
  }

  public getGenres(): Observable<{ genres: Genres[] }> {
    return this.call('genre/movie/list')
  }

  public getMoviesDiscover(options: { with_genres?: string }): Observable<MoviesListResult> {
    return this.call('discover/movie', options);
  }

  public getMovieImages(id: string): Observable<MovieImagesResult> {
    return this.call(`movie/${id}/images`);
  }

  public getMovieCredits(id: string): Observable<MovieCreditsResult> {
    return this.call(`movie/${id}/credits`);
  }

  public getMovieKeyword(id: string): Observable<KeywordResult> {
    return this.call(`movie/${id}/keywords`);
  }

  public getMovieRecommendation(id: string): Observable<MoviesListResult> {
    return this.call(`movie/${id}/recommendations`);
  }

  public getMovieInfo(id: string) {
    const sources = [this.getMovieDetails(id), this.getMovieCredits(id), this.getMovieImages(id),
      this.getMovieKeyword(id), this.getMovieRecommendation(id)]

    return combineLatest(sources)
      .pipe(map(([details, credits, images, keywords, recommendation]) => ({
        details,
        credits,
        images,
        keywords,
        recommendation
      })));
  }

  private call<T>(url: string, parameters?: object) {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}?${this.createQueryParams(parameters)}`)
  }

  private createQueryParams(parameters?: object) {
    return QueryString.stringify({...parameters, api_key: this.apiKey})
  }

}
