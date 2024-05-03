import { CVInterface, sendingCVFormatedInterface } from './../../../shared/types/cv.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { SharedService } from 'src/app/shared/services/shared-service/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CVService {
  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  getCVs() {
    return this.http.get<CVInterface[]>(API_URLS.CV_URL).pipe(
      map(cvs => {
        return cvs.map(cv => this.sharedService.formatCV(cv));
      })
    );
  }

  getCVById(cvId: number) {
    return this.http
      .get<CVInterface>(`${API_URLS.CV_URL}/${cvId}`)
      .pipe(map(cv => this.sharedService.formatCV(cv)));
  }

  createCV(cvBody: sendingCVFormatedInterface) {
    return this.http
      .post<CVInterface>(API_URLS.CV_URL, cvBody)
      .pipe(map(cv => this.sharedService.formatCV(cv)));
  }

  updateCV(cvId: number, cvBody: sendingCVFormatedInterface) {
    return this.http
      .put<CVInterface>(`${API_URLS.CV_URL}/${cvId}`, cvBody)
      .pipe(map(cv => this.sharedService.formatCV(cv)));
  }

  deleteCV(cvId: number) {
    return this.http
      .delete<CVInterface>(`${API_URLS.CV_URL}/${cvId}`)
      .pipe(map(cv => this.sharedService.formatCV(cv)));
  }
}
