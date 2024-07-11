import { ErrorsService } from '../../../shared/services/errors-service/errors.service';
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
  constructor(
    private authService: AuthService,
    private errorsService: ErrorsService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === (401 || 403)) {
          return this.handleAuthError(request, next);
        }

        return throwError(() => {
          this.errorsService.handleError(error);
          return error;
        });
      })
    );
  }

  addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  handleAuthError(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response: TokensResponse) => {
        const newAccessToken = response.access_token;
        this.authService.setAccessToken(newAccessToken);
        request = this.addTokenToRequest(request, newAccessToken);

        return next.handle(request);
        // return next.handle(request).pipe(catchError(e => of(e)));
      }),
      catchError(refreshTokenOrRequestError => {
        if (refreshTokenOrRequestError.status === 403) {
          this.authService.logout().subscribe();
        }

        this.errorsService.handleError(refreshTokenOrRequestError);
        return throwError(() => refreshTokenOrRequestError);
      })
    );
  }
}
