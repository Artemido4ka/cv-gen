import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import {
  BasicObjectItem,
  IFormatedProject,
  IProject,
  ResponsibilityT,
  TeamRoleT,
  TechStackItemT,
  RequestProject,
} from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  PROJECTS_URL = API_URLS.PROJECTS;
  ROLES_URL = API_URLS.ROLES_URL;
  RESPONSIBILITIES_URL = API_URLS.RESPONSIBILITIES_URL;
  TECH_STACK_URL = API_URLS.TECH_STACK_URL;

  getProjects() {
    return this.http.get<IProject[]>(this.PROJECTS_URL).pipe(
      map(projects => {
        return projects
          // .map(project => this.formatProjectDate(project))
          .map(project => this.formatProject(project));
      })
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

  getRoles() {
    return this.http
      .get<ResponsibilityT[]>(this.ROLES_URL)
      .pipe(map(teamRoles => this.formatObjectToString(teamRoles)));
  }
  getResponsibilities() {
    return this.http
      .get<TeamRoleT[]>(this.RESPONSIBILITIES_URL)
      .pipe(map(responsibilities => this.formatObjectToString(responsibilities)));
  }
  getTechStack() {
    return this.http
      .get<TechStackItemT[]>(this.TECH_STACK_URL)
      .pipe(map(techStack => this.formatObjectToString(techStack)));
  }

  formatProject(project: IProject): IFormatedProject {
    const responsibilities = this.formatObjectToString(project.responsibilities);
    const techStack = this.formatObjectToString(project.techStack);
    const teamRoles = this.formatObjectToString(project.teamRoles);

    return { ...project, responsibilities, techStack, teamRoles };
  }

  formatObjectToString(item: BasicObjectItem[]) {
    return item.map(i => i.name);
  }

  formatProjectDate(project: IProject): IProject {
    const format = 'dd MM yyyy';
    const locale = 'en';
    const startDate = formatDate(project.startDate, format, locale);
    const endDate = formatDate(project.endDate, format, locale);

    return { ...project, startDate, endDate };
  }
}
