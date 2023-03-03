import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {MovieDetailComponent} from "./movies/movie-detail/movie-detail.component";

export const appRoutes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movie/:id', component: MovieDetailComponent}
];
