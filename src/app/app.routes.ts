import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { RegisterComponent } from "./pages/register/register.component";

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];
