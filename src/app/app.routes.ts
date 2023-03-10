import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ExploreComponent } from './pages/explore/explore.component';
import { SearchComponent } from './pages/search/search.component';
import { ExploreDetailsComponent } from './pages/explore-details/explore-details.component';
import { AuthGuard } from './shared/guard/auth-guard.guard'


export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore/details', component: ExploreDetailsComponent },

  { path: 'search', component: SearchComponent },

  { path: 'movie/:id', component: MovieDetailComponent, canActivate: [AuthGuard] }
];
