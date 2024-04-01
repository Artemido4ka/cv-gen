import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const reqWithToken = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
      });
      return next.handle(reqWithToken);
    }

    return next.handle(request);
  }
}
