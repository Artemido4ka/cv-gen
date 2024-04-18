import { Validators } from "@angular/forms";
import { customValidator } from "src/app/shared/validators/validators";

export const employeesTableColumns = [
  {
    columnDef: 'id',
    header: 'home.employees.table.headers.id',
  },
  {
    columnDef: 'firstName',
    header: 'home.employees.table.headers.firstName',
  },
  {
    columnDef: 'lastName',
    header: 'home.employees.table.headers.lastName',
  },
  {
    columnDef: 'email',
    header: 'home.employees.table.headers.email',
  },
  {
    columnDef: 'department',
    header: 'home.employees.table.headers.department',
  },
  {
    columnDef: 'specialization',
    header: 'home.employees.table.headers.specialization',
  },
];

export const employeeRequiredFieldValidator = (translationKey: string) =>
  customValidator(
    Validators.required,
    `home.employee.${translationKey}.errors.required`,
    'required'
  );