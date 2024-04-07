import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

export interface TokensResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  LOGIN_URL = API_URLS.LOGIN;
  REFRESH_TOKEN_URL = API_URLS.REFRESH_TOKEN;
  LOGOUT_URL = API_URLS.LOGOUT_URL;

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('accessToken', accessToken);
  }

  removeAccessToken() {
    return localStorage.removeItem('accessToken');
  }

  checkIsUserLogged() {
    const accessToken = this.getAccessToken();
    return accessToken ? true : false;
  }

  login(credentials: { userName: string; password: string }) {
    return this.http
      .post<TokensResponse>(this.LOGIN_URL, credentials, { withCredentials: true })
      .pipe(
        catchError(this.handleLoginError),
        tap(val => {
          this.setAccessToken(val.access_token);
        })
      );
  }

  handleLoginError(err: HttpErrorResponse) {
    let errorMessage = 'shared.errors.auth.unexpected';
    if (err.status === 403) {
      errorMessage = 'auth.login.errors.credentials';
    }
    return throwError(() => errorMessage);
  }

  // refreshToken() {
  //   // this.removeAccessToken();
  //   console.log('inside refreshToken');
  //   return this.http.get<TokensResponse>(this.REFRESH_TOKEN_URL, { withCredentials: true }).pipe(
  //     catchError(err => {
  //       // this.logout().subscribe();
  //       return throwError(() => err);
  //     }),
  //     tap(res => {
  //       console.log('call refreshToken');
  //       this.setAccessToken(res.access_token);
  //     })
  //   );
  // }

  refreshToken() {
    return this.http.get<TokensResponse>(this.REFRESH_TOKEN_URL, { withCredentials: true });
  }

  // logout() {
  //   return this.http.get(this.LOGOUT_URL);
  // }

  logout() {
    this.removeAccessToken();
    return this.http.get(this.LOGOUT_URL).pipe(
      catchError(err => {
        return throwError(() => err);
      }),
      tap(() => this.router.navigate([RoutingPaths.AUTH]))
    );
  }
}
