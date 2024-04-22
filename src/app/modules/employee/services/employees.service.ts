import { CVService } from 'src/app/modules/employee/services/cv.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import {
  IBasicObjectItem,
  IEmployee,
  IFormatedEmployee,
  RequestEmployeeT,
} from 'src/app/shared/types/employees.types';
import { TechStackItemT } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    private cvService: CVService
  ) {}

  getEmployees() {
    return this.http.get<IEmployee[]>(API_URLS.EMPLOYEES_URL).pipe(
      map(employees => {
        return employees.map(employee => this.formatEmployee(employee));
      })
    );
  }

  getEmployeeById(employeeId: number) {
    return this.http
      .get<IEmployee>(`${API_URLS.EMPLOYEES_URL}/${employeeId}`)
      .pipe(map(employee => this.formatEmployee(employee)));
  }

  createEmployee(employeeBody: RequestEmployeeT) {
    return this.http
      .post<IEmployee>(API_URLS.EMPLOYEES_URL, employeeBody)
      .pipe(map(employee => this.formatEmployee(employee)));
  }

  updateEmployee(projectId: number, projectBody: RequestEmployeeT) {
    return this.http
      .put<IEmployee>(`${API_URLS.EMPLOYEES_URL}/${projectId}`, projectBody)
      .pipe(map(project => this.formatEmployee(project)));
  }

  getDepartments() {
    return this.http
      .get<IBasicObjectItem[]>(API_URLS.DEPARTMENTS_URL)
      .pipe(map(departments => this.formatObjectToString(departments)));
  }

  getSpecializations() {
    return this.http
      .get<TechStackItemT[]>(API_URLS.SPECIALIZATIONS_URL)
      .pipe(map(specializations => this.formatObjectToString(specializations)));
  }

  formatEmployee(employee: IEmployee): IFormatedEmployee {
    const department = employee.department.name;
    const specialization = employee.specialization.name;

    const cvs = employee.cvs.map(cv => this.cvService.formatCV(cv));

    return { ...employee, department, specialization, cvs };
  }

  formatObjectToString(item: IBasicObjectItem[]) {
    return item.map(i => i.name);
  }
}
