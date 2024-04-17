import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.store';
import { IEmployeesState } from './employees.state';

const selectEmployeesState = (state: IAppState) => state.employeesState;

export const selectEmployees = createSelector(
  selectEmployeesState,
  (state: IEmployeesState) => state.employees
);

export const selectEmployeesReqStatus = createSelector(
  selectEmployeesState,
  (state: IEmployeesState) => state.requestStatus
);

export const selectEmployeesError = createSelector(
  selectEmployeesState,
  (state: IEmployeesState) => state.error
);

export const selectEmployee = createSelector(
  selectEmployeesState,
  (state: IEmployeesState) => state.employee
);
