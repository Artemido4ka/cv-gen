import { formatProject } from './../../../shared/utils/project.utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { IFormatedProject, IProject, RequestProject } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<IProject[]>(API_URLS.PROJECTS).pipe(
      map(projects => {
        return (
          projects
            // .map(project => formatProjectDate(project))
            .map(project => formatProject(project))
        );
      })
    );
  }

  getProjectById(projectId: number) {
    return this.http
      .get<IProject>(`${API_URLS.PROJECTS}/${projectId}`)
      .pipe(map(project => formatProject(project)));
  }

  createProject(projectBody: RequestProject): Observable<IFormatedProject> {
    return this.http
      .post<IProject>(API_URLS.PROJECTS, projectBody)
      .pipe(map(project => formatProject(project)));
  }

  updateProject(projectId: number, projectBody: RequestProject) {
    return this.http
      .put<IProject>(`${API_URLS.PROJECTS}/${projectId}`, projectBody)
      .pipe(map(project => formatProject(project)));
  }
}
