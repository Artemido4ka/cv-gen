import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import {
  IBasicObjectItem,
  IEmployee,
  IFormatedEmployee,
} from 'src/app/shared/types/employees.types';
import { TechStackItemT } from 'src/app/shared/types/project.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<IEmployee[]>(API_URLS.EMPLOYEES_URL).pipe(
      map(employees => {
        return employees.map(employee => this.formatEmployee(employee));
      })
    );
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

    return { ...employee, department, specialization };
  }

  formatObjectToString(item: IBasicObjectItem[]) {
    return item.map(i => i.name);
  }
}
