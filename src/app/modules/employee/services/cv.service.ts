import { ProjectsService } from './../../projects/services/projects.service';
import { CVFormatedInterface, CVInterface } from './../../../shared/types/cv.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { IBasicObjectItem } from 'src/app/shared/types/employees.types';

@Injectable({
  providedIn: 'root',
})
export class CVService {
  constructor(
    private http: HttpClient,
    private projectsService: ProjectsService
  ) {}

  getCVs() {
    return this.http.get<CVInterface[]>(API_URLS.CV_URL).pipe(
      map(cvs => {
        return cvs.map(cv => this.formatCV(cv));
      })
    );
  }

  getCVById(cvId: number) {
    return this.http
      .get<CVInterface>(`${API_URLS.CV_URL}/${cvId}`)
      .pipe(map(cv => this.formatCV(cv)));
  }

  createCV(cvBody: CVFormatedInterface) {
    return this.http.post<CVInterface>(API_URLS.CV_URL, cvBody).pipe(map(cv => this.formatCV(cv)));
  }

  updateCV(cvId: number, cvBody: CVFormatedInterface) {
    return this.http
      .put<CVInterface>(`${API_URLS.CV_URL}/${cvId}`, cvBody)
      .pipe(map(cv => this.formatCV(cv)));
  }

  deleteCV(cvId: number) {
    return this.http
      .delete<CVInterface>(`${API_URLS.CV_URL}/${cvId}`)
      .pipe(map(cv => this.formatCV(cv)));
  }

  formatCV(cv: CVInterface): CVFormatedInterface {
    const department = cv.department.name;
    const specialization = cv.specialization.name;
    const language = cv.language.map(i => {
      return { name: i.name, level: i.level };
    });
    const skills = cv.skills.map(i => i.name);
    const cvsProjects = cv.cvsProjects.map(project => this.projectsService.formatProject(project));

    return { ...cv, department, specialization, language, skills, cvsProjects };
  }

  formatObjectToString(item: IBasicObjectItem[]) {
    return item.map(i => i.name);
  }
}
