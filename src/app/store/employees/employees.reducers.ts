import { createReducer, on } from '@ngrx/store';

import { EReqStatus } from 'src/app/shared/constants/request.status';
import { initialEmployeesState } from './employees.state';
import {
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
  })
);
