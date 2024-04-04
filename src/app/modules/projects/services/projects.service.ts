import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { FormatedProject, Project } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsServiceTsService {
  constructor(private http: HttpClient) {}

  URL = API_URLS.PROJECTS;

  getProjects() {
    const res = this.http.get<Project[]>(this.URL).pipe(
      catchError(err => {
        return throwError(() => err);
      }),
      map(projects => this.formatProjectsArray(projects))
    );

    return res;
  }

  formatProjectsArray(projects: Project[]): FormatedProject[] {
    const formatedProjects = projects.map(project => {
      const format = 'dd MM yyyy';
      const locale = 'en';
      const startDate = formatDate(project.startDate, format, locale);
      const endDate = formatDate(project.endDate, format, locale);
      const responsibilities = project.responsibilities.map(i => i.name);
      const techStack = project.techStack.map(i => i.name);
      const teamRoles = project.teamRoles.map(i => i.name);

      return { ...project, responsibilities, techStack, teamRoles, startDate, endDate };
    });

    return formatedProjects;
  }
}
