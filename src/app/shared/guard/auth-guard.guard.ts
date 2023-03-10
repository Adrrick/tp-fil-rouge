import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from "../services/storage.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const isAuthenticated = storageService.isLogged();
  const isAuthPage = state.url.includes('login') || state.url.includes('register');
  if(isAuthenticated && isAuthPage) {
    router.navigate(['/']).then()
  }
  if (!isAuthenticated) {
    router.navigate(['/login']).then()
  }
  return isAuthenticated;
};