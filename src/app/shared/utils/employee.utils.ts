import { IEmployee, IFormatedEmployee } from '../types/employees.types';
import { formatCV } from './cv.utils';

export const formatEmployee = (employee: IEmployee): IFormatedEmployee => {
  const department = employee.department.name;
  const specialization = employee.specialization.name;

  const cvs = employee.cvs.map(cv => formatCV(cv));

  return { ...employee, department, specialization, cvs };
};
