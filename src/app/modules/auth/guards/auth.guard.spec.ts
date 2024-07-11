import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['checkIsUserLogged']);

  // const executeGuard: CanActivateFn = (...guardParameters) =>
  //   TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should navigate to AUTH route if user is not logged in', () => {
    // Arrange
    authServiceSpy.checkIsUserLogged.and.returnValue(false);

    // Act
    const canActivate = TestBed.runInInjectionContext(() => authGuard(route, state));

    // Assert
    expect(authService.checkIsUserLogged).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([RoutingPaths.AUTH]);
    expect(canActivate).toBeFalse();
  });

  it('should return true if user is logged in', () => {
    authServiceSpy.checkIsUserLogged.and.returnValue(true);

    const canActivate = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(router.navigate).not.toHaveBeenCalled();
    expect(canActivate).toBeTrue();
  });
});
