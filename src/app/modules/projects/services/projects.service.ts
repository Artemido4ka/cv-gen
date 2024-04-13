import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { IFormatedProject, IProject, RequestProject } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  PROJECTS_URL = API_URLS.PROJECTS;

  getProjects() {
    return this.http
      .get<IProject[]>(this.PROJECTS_URL)
      .pipe(
        map(projects =>
          projects
            .map(project => this.formatProjectDate(project))
            .map(project => this.formatProject(project))
        )
      );
  }

  getProjectById(projectId: number) {
    return this.http
      .get<IProject>(`${this.PROJECTS_URL}/${projectId}`)
      .pipe(map(project => this.formatProject(project)));
  }

  createProject(projectBody: RequestProject) {
    return this.http
      .post<IProject>(this.PROJECTS_URL, projectBody)
      .pipe(map(project => this.formatProject(project)));
  }

  updateProject(projectId: number, projectBody: RequestProject) {
    return this.http
      .put<IProject>(`${this.PROJECTS_URL}/${projectId}`, projectBody)
      .pipe(map(project => this.formatProject(project)));
  }

  formatProject(project: IProject): IFormatedProject {
    const responsibilities = project.responsibilities.map(i => i.name);
    const techStack = project.techStack.map(i => i.name);
    const teamRoles = project.teamRoles.map(i => i.name);

    return { ...project, responsibilities, techStack, teamRoles };
  }

  formatProjectDate(project: IProject): IProject {
    const format = 'dd MM yyyy';
    const locale = 'en';
    const startDate = formatDate(project.startDate, format, locale);
    const endDate = formatDate(project.endDate, format, locale);

    return { ...project, startDate, endDate };
  }
}
