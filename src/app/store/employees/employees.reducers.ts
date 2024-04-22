import { createReducer, on } from '@ngrx/store';

import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import { initialEmployeesState } from './employees.state';
import {
  addEmployeeAction,
  addEmployeeFailedAction,
  addEmployeeSuccessAction,
  editEmployeeAction,
  editEmployeeFailedAction,
  editEmployeeSuccessAction,
  getEmployeeAction,
  getEmployeeFailedAction,
  getEmployeeSuccessAction,
  getEmployeesAction,
  getEmployeesFailedAction,
  getEmployeesSuccessAction,
} from './employees.actions';

export const employeesReducers = createReducer(
  initialEmployeesState,

  //Get all employees
  on(getEmployeesAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getEmployeesSuccessAction, (state, { employees }) => {
    return { ...state, employees, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getEmployeesFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Get Employee by id
  on(getEmployeeAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Create Employee
  on(addEmployeeAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(addEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(addEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Update Employee
  on(editEmployeeAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(editEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(editEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  })
);
