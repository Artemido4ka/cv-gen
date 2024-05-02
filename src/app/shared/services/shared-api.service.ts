import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsibilityT, TeamRoleT, TechStackItemT } from '../types/project.types';
import { API_URLS } from '../constants/api-urls';
import { map } from 'rxjs';
import { formatObjectToString } from '../utils/project.utils';

@Injectable({
  providedIn: 'root',
})
export class SharedAPIService {
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http
      .get<ResponsibilityT[]>(API_URLS.ROLES_URL)
      .pipe(map(teamRoles => formatObjectToString(teamRoles)));
  }
  getResponsibilities() {
    return this.http
      .get<TeamRoleT[]>(API_URLS.RESPONSIBILITIES_URL)
      .pipe(map(responsibilities => formatObjectToString(responsibilities)));
  }
  getTechStack() {
    return this.http
      .get<TechStackItemT[]>(API_URLS.TECH_STACK_URL)
      .pipe(map(techStack => formatObjectToString(techStack)));
  }
}
