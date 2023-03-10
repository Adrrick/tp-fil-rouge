import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthGuard } from './shared/guard/auth-guard.guard';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'search', component: SearchComponent },

  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profiles', component: ProfilesComponent },
];
