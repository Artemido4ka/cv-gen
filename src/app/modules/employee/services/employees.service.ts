import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { IEmployee, RequestEmployeeT } from 'src/app/shared/types/employees.types';
import { TechStackItemT } from 'src/app/shared/types/project.types';
import { IBasicObjectItem } from 'src/app/shared/types/core.type';

import { formatObjectToString } from 'src/app/shared/utils/shared.utils';
import { SharedService } from 'src/app/shared/services/shared-service/shared.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  getEmployees() {
    return this.http.get<IEmployee[]>(API_URLS.EMPLOYEES_URL).pipe(
      map(employees => {
        return employees.map(employee => this.sharedService.formatEmployee(employee));
      })
    );
  }

  getEmployeeById(employeeId: number) {
    return this.http
      .get<IEmployee>(`${API_URLS.EMPLOYEES_URL}/${employeeId}`)
      .pipe(map(employee => this.sharedService.formatEmployee(employee)));
  }

  createEmployee(employeeBody: RequestEmployeeT) {
    return this.http
      .post<IEmployee>(API_URLS.EMPLOYEES_URL, employeeBody)
      .pipe(map(employee => this.sharedService.formatEmployee(employee)));
  }

  updateEmployee(projectId: number, projectBody: RequestEmployeeT) {
    return this.http
      .put<IEmployee>(`${API_URLS.EMPLOYEES_URL}/${projectId}`, projectBody)
      .pipe(map(project => this.sharedService.formatEmployee(project)));
  }

  getDepartments() {
    return this.http
      .get<IBasicObjectItem[]>(API_URLS.DEPARTMENTS_URL)
      .pipe(map(departments => formatObjectToString(departments)));
  }

  getSpecializations() {
    return this.http
      .get<TechStackItemT[]>(API_URLS.SPECIALIZATIONS_URL)
      .pipe(map(specializations => formatObjectToString(specializations)));
  }

  getLanguages() {
    return this.http
      .get<IBasicObjectItem[]>(API_URLS.LANGUAGES_URL)
      .pipe(map(languages => formatObjectToString(languages)));
  }

  getLevels() {
    return this.http
      .get<IBasicObjectItem[]>(API_URLS.LEVELS_URL)
      .pipe(map(levels => formatObjectToString(levels)));
  }
}
