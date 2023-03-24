import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import MovieDetails from 'src/app/models/Movie-details';
import PopularMoviesResult from 'src/app/models/PopularMoviesResult';
import Genres from 'src/app/models/Genres';

type Params = Record<string, string | string[] | number | number[] | undefined>

interface Pagination {
  page?: number;
}

interface SearchMovieParams extends Pagination, Params {
  query: string;
}

interface GetMovieDiscoverParams extends Pagination, Params {
  with_genres?: string
}


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '41770330e49047aac35ce453ac66b586';

  constructor(private httpClient: HttpClient) { }

  public getPopularMovies(): Observable<PopularMoviesResult> {
    return this.call(`movie/popular`)
  }
  public getTopRatedMovies(): Observable<PopularMoviesResult> {
    return this.call(`movie/top_rated`)
  }

  public getUpcomingMovies(): Observable<PopularMoviesResult> {
    return this.call(`movie/upcoming`)
  }

  public getMovieDetails(id: string,): Observable<MovieDetails> {
    return this.call(`movie/${id}`)
  }

  public searchMovies(params: SearchMovieParams): Observable<PopularMoviesResult> {
    return this.call(`search/movie`, params)
  }

  public getGenres(): Observable<{ genres: Genres[] }> {
    return this.call('genre/movie/list')
  }

  public getMoviesDiscover(params: GetMovieDiscoverParams): Observable<PopularMoviesResult> {
    return this.call('discover/movie', params);
  }

  private call<T>(url: string, parameters?: Params) {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}?${this.createQueryParams(parameters)}`)
  }

  private createQueryParams(parameters?: Params) {
    return new URLSearchParams({ ...parameters, api_key: this.apiKey }).toString()
  }

}
