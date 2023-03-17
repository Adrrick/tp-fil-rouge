import { Route } from '@angular/router';
import { AuthGuard } from './shared/guard/auth-guard.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },

  { path: 'login', loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent) },
  { path: 'register', loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent) },

  { path: 'explore', loadComponent: () => import("./pages/explore/explore.component").then((m) => m.ExploreComponent) },
  { path: 'explore/details', loadComponent: () => import('./pages/explore-details/explore-details.component').then((m) => m.ExploreDetailsComponent) },

  { path: 'search', loadComponent: () => import("./pages/search/search.component").then((m) => m.SearchComponent) },

  {
    path: 'user/:id',
    loadComponent: () => import('./pages/profile-details/profile-details.component').then((m) => m.ProfileDetailsComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent),
    canActivate: [AuthGuard],
  },
];
