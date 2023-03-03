import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface result {page?: number; results?: any[]; total_results?: number; total_pages?: number; status_message?: string; status_code: number;}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '41770330e49047aac35ce453ac66b586';

  constructor(private httpClient: HttpClient) { }

  public getPopular(): Observable<result> {
    return this.httpClient.get<result>(this.baseUrl + 'movie/popular?api_key=' + this.apiKey);
  }

  public getMovie(id: string): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'movie/' + id + '?api_key=' + this.apiKey);
  }

}
