import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineLatest, map, Observable} from "rxjs";
import * as QueryString from 'qs';
import MovieDetails from 'src/app/models/Movie-details';
import Genres from 'src/app/models/Genres';
import { environment } from 'src/environments/environment';
import MoviesListResult from 'src/app/models/MoviesListResult';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = environment.api.baseUrl;
  apiKey = environment.api.apiKey;

  constructor(private httpClient: HttpClient) {
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

  private call<T>(url: string, parameters?: object) {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}?${this.createQueryParams(parameters)}`)
  }

  private createQueryParams(parameters?: object) {
    return QueryString.stringify({...parameters, api_key: this.apiKey})
  }

}
