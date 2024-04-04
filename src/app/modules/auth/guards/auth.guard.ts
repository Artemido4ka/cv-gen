import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLogedIn = authService.checkIsUserLogged();

  if (!isLogedIn) {
    router.navigate([RoutingPaths.AUTH]);
  }

  return isLogedIn;
};
