import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URLS } from 'src/app/shared/constants/api-urls';
import { IEmployee, IFormatedEmployee } from 'src/app/shared/types/employees.types';

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

  formatEmployee(employee: IEmployee): IFormatedEmployee {
    const department = employee.department.name;
    const specialization = employee.specialization.name;

    return { ...employee, department, specialization };
  }
}
