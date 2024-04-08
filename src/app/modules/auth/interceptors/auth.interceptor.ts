import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService, TokensResponse } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === (401 || 403)) {
          window.alert('Expired !');
          return this.handleAuthError(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleAuthError(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response: TokensResponse) => {
        const newAccessToken = response.access_token;
        this.authService.setAccessToken(newAccessToken);
        request = this.addTokenToRequest(request, newAccessToken);

        return next.handle(request);
      }),
      catchError(refreshTokenError => {
        //TODO: this catch block is called not only in refreshTokenError case, but also in case of this.addTokenToRequest, fix it
        // this.authService.logout().subscribe();
        return throwError(() => refreshTokenError);
      })
    );
  }

  // private handleUnauthorizedErrors() {
  //   return this.authService.logout().pipe(
  //     switchMap(() => {
  //       console.log('inside logout');
  //       this.router.navigate([RoutingPaths.AUTH]);
  //       return throwError(() => refreshError);
  //     }),
  //     catchError(logoutError => {
  //       return throwError(() => logoutError);
  //     })
  //   );
  // }
}
