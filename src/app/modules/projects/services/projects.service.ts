import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { FormatedProject, Project, RequestProject } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  PROJECTS_URL = API_URLS.PROJECTS;

  getProjects() {
    return this.http.get<Project[]>(this.PROJECTS_URL).pipe(
      catchError(err => {
        return throwError(() => err);
      }),
      map(projects =>
        projects
          .map(project => this.formatProjectDate(project))
          .map(project => this.formatProjectArrays(project))
      )
    );
  }

  getProjectById(projectId: number) {
    return this.http.get<Project>(`${this.PROJECTS_URL}/${projectId}`).pipe(
      catchError(err => {
        return throwError(() => err);
      }),
      map(project => this.formatProjectArrays(project))
    );
  }

  createProject(projectBody: RequestProject) {
    return this.http.post(this.PROJECTS_URL, projectBody).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  updateProject(projectId: number, projectBody: RequestProject) {
    return this.http
      .put(`${this.PROJECTS_URL}/${projectId}`, projectBody)
      .pipe(catchError(err => err));
  }

  formatProjectArrays(project: Project): FormatedProject {
    const responsibilities = project.responsibilities.map(i => i.name);
    const techStack = project.techStack.map(i => i.name);
    const teamRoles = project.teamRoles.map(i => i.name);

    return { ...project, responsibilities, techStack, teamRoles };
  }

  formatProjectDate(project: Project): Project {
    const format = 'dd MM yyyy';
    const locale = 'en';
    const startDate = formatDate(project.startDate, format, locale);
    const endDate = formatDate(project.endDate, format, locale);

    return { ...project, startDate, endDate };
  }
}
