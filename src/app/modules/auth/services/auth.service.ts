import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  URL = API_URLS.LOGIN;

  login(email: string, password: string) {
    const body = { email, password };
    const res = this.http.post<LoginResponse>(this.URL, body).pipe(
      catchError(err => {
        let errorMessage = 'shared.errors.auth.unexpected';
        if (err.status === 403) {
          errorMessage = 'auth.login.errors.credentials';
        }
        return throwError(() => errorMessage);
      }),
      tap(val => {
        localStorage.setItem('accessToken', val.access_token);
        localStorage.setItem('refreshToken', val.refresh_token);
      })
    );

    return res;
  }

  checkIsUserLogged() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? true : false;
  }
}
