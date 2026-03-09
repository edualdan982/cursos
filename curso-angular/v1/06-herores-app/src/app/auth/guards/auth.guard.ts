import {
  CanMatchFn,
  Route,
  UrlSegment,
  CanActivateFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

const checkAuthState = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAutentication().pipe(
    tap((isAuthenticated) => {
      console.log({ isAuthenticated: isAuthenticated });
    }),
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigate(['./auth/login']);
    }),
  );
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch activeted');
  console.log({ route, segments });

  return true;
};

export const canActivatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate processing');
  console.log({ route, state });

  return checkAuthState();
};
