import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { EmployeesService } from 'src/app/modules/employee/services/employees.service';
import {
  getDepartmentsAction,
  getDepartmentsFailedAction,
  getDepartmentsSuccessAction,
  getLanguagesAction,
  getLanguagesFailedAction,
  getLanguagesSuccessAction,
  getLevelsAction,
  getLevelsFailedAction,
  getLevelsSuccessAction,
  getSpecializationsAction,
  getSpecializationsFailedAction,
  getSpecializationsSuccessAction,
} from './core.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}

  loadSpecializations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSpecializationsAction),
      switchMap(() => {
        return this.employeesService.getSpecializations().pipe(
          map(specializations => getSpecializationsSuccessAction({ specializations })),
          catchError((error: HttpErrorResponse) => of(getSpecializationsFailedAction(error)))
        );
      })
    )
  );

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDepartmentsAction),
      switchMap(() => {
        return this.employeesService.getDepartments().pipe(
          map(departments => getDepartmentsSuccessAction({ departments })),
          catchError((error: HttpErrorResponse) => of(getDepartmentsFailedAction(error)))
        );
      })
    )
  );

  loadLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLanguagesAction),
      switchMap(() => {
        return this.employeesService.getLanguages().pipe(
          map(languages => getLanguagesSuccessAction({ languages })),
          catchError((error: HttpErrorResponse) => of(getLanguagesFailedAction(error)))
        );
      })
    )
  );

  loadLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLevelsAction),
      switchMap(() => {
        return this.employeesService.getLevels().pipe(
          map(levels => getLevelsSuccessAction({ levels })),
          catchError((error: HttpErrorResponse) => of(getLevelsFailedAction(error)))
        );
      })
    )
  );
}
