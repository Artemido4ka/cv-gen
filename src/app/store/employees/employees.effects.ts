import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
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
import { EmployeesService } from 'src/app/modules/employee/services/employees.service';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEmployeesAction),
      switchMap(() => {
        return this.employeesService.getEmployees().pipe(
          map(employees => getEmployeesSuccessAction({ employees })),
          catchError((error: HttpErrorResponse) => of(getEmployeesFailedAction(error)))
        );
      })
    )
  );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEmployeeAction),
      switchMap(action => {
        return this.employeesService.getEmployeeById(action.id).pipe(
          map(employee => getEmployeeSuccessAction({ employee })),
          catchError((error: HttpErrorResponse) => of(getEmployeeFailedAction(error)))
        );
      })
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployeeAction),
      switchMap(action => {
        return this.employeesService.createEmployee(action.employee).pipe(
          map(employee => addEmployeeSuccessAction({ employee })),
          catchError((error: HttpErrorResponse) => of(addEmployeeFailedAction(error)))
        );
      })
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editEmployeeAction),
      switchMap(action => {
        return this.employeesService.updateEmployee(action.id, action.employee).pipe(
          map(employee => editEmployeeSuccessAction({ employee })),
          catchError((error: HttpErrorResponse) => of(editEmployeeFailedAction(error)))
        );
      })
    )
  );
}
