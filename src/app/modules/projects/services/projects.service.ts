import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';

@Injectable({
  providedIn: 'root',
})
export class ProjectsServiceTsService {
  constructor(private http: HttpClient) {}

  URL = API_URLS.PROJECTS;

  getProjects() {
    const res = this.http.get(this.URL).pipe(
      catchError(err => {
        console.log(err, 'ERR');
        return throwError(() => err);
      }),
      tap(val => {
        console.log(val, 'VAL');
        return val;
      })
    );

    return res;
  }
}
