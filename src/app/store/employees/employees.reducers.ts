import { createReducer, on } from '@ngrx/store';

import { EReqStatus } from 'src/app/shared/constants/request.status';
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
  on(getEmployeesAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(getEmployeesSuccessAction, (state, { employees }) => {
    return { ...state, employees, requestStatus: EReqStatus.SUCCESS };
  }),

  on(getEmployeesFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Get Employee by id
  on(getEmployeeAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(getEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: EReqStatus.SUCCESS };
  }),

  on(getEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Create Employee
  on(addEmployeeAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(addEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: EReqStatus.SUCCESS };
  }),

  on(addEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Update Employee
  on(editEmployeeAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(editEmployeeSuccessAction, (state, { employee }) => {
    return { ...state, employee, requestStatus: EReqStatus.SUCCESS };
  }),

  on(editEmployeeFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  })
);
