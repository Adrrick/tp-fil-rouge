import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as QueryString from 'qs';
import MovieDetails from 'src/app/models/Movie-details';
import PopularMoviesResult from 'src/app/models/PopularMoviesResult';
import Genres from 'src/app/models/Genres';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '41770330e49047aac35ce453ac66b586';

  constructor(private httpClient: HttpClient) { }

  public getPopular(): Observable<PopularMoviesResult> {
    return this.call(`movie/popular`)
  }

  public getMovieDetails(id: string): Observable<MovieDetails> {
    return this.call(`movie/${id}`)
  }

  public getGenres(): Observable<{ genres: Genres[] }> {
    return this.call('genre/movie/list')
  }

  public getMoviesDiscover(options: { with_genres?: string }): Observable<PopularMoviesResult> {
    return this.call('/discover/movie', options);
  }

  private call<T>(url: string, parameters?: object) {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}?${this.createQueryParams(parameters)}`)
  }

  private createQueryParams(parameters?: object) {
    return QueryString.stringify({ ...parameters, api_key: this.apiKey })
  }

}
