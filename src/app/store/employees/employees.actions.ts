import { createAction, props } from '@ngrx/store';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';

export enum EnumEmployeesActions {
  GetEmployees = '[Employees API] Get Employees',
  GetEmployeesSuccess = '[Employees API] Get Employees Success',
  GetEmployeesError = '[Employees API] Get Employees Error',
  GetEmployee = '[Employees API] Get Employee',
  GetEmployeeSuccess = '[Employees API] Get Employee Success',
  GetEmployeeError = '[Employees API] Get Employee Error',
  AddEmployee = '[Employees API] Add Employee',
  AddEmployeeSuccess = '[Employees API] Add Employee Success',
  AddEmployeeError = '[Employees API] Add Employee Error',
  EditEmployee = '[Employees API] Edit Employee',
  EditEmployeeSuccess = '[Employees API] Edit Employee Success',
  EditEmployeeError = '[Employees API] Edit Employee Error',
}

//Get all employees
export const getEmployeesAction = createAction(EnumEmployeesActions.GetEmployees);

export const getEmployeesSuccessAction = createAction(
  EnumEmployeesActions.GetEmployeesSuccess,
  props<{ employees: IFormatedEmployee[] }>()
);

export const getEmployeesFailedAction = createAction(
  EnumEmployeesActions.GetEmployeesError,
  props<{ error: Error }>()
);

//Get Employee by id
export const getEmployeeAction = createAction(
  EnumEmployeesActions.GetEmployee,
  props<{ id: number }>()
);

export const getEmployeeSuccessAction = createAction(
  EnumEmployeesActions.GetEmployeeSuccess,
  props<{ employee: IFormatedEmployee }>()
);

export const getEmployeeFailedAction = createAction(
  EnumEmployeesActions.GetEmployeeError,
  props<{ error: Error }>()
);

//Create Employee
export const addEmployeeAction = createAction(
  EnumEmployeesActions.AddEmployee,
  props<{ employee: IFormatedEmployee }>()
);

export const addEmployeeSuccessAction = createAction(
  EnumEmployeesActions.AddEmployeeSuccess,
  props<{ employee: IFormatedEmployee }>()
);

export const addEmployeeFailedAction = createAction(
  EnumEmployeesActions.AddEmployeeError,
  props<{ error: Error }>()
);

//Update Employee
export const editEmployeeAction = createAction(
  EnumEmployeesActions.EditEmployee,
  props<{ id: number; employee: IFormatedEmployee }>()
);

export const editEmployeeSuccessAction = createAction(
  EnumEmployeesActions.EditEmployeeSuccess,
  props<{ employee: IFormatedEmployee }>()
);

export const editEmployeeFailedAction = createAction(
  EnumEmployeesActions.EditEmployeeError,
  props<{ error: Error }>()
);
