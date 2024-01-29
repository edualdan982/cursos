import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthState = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAutentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) router.navigate(['./heroes']);
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

export const canActivateGuardPublic: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthState();
};
