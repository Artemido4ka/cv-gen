import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import {
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
}
