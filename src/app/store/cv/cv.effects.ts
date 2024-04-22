import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  addCVFailedAction,
  addCVAction,
  getCVAction,
  getCVFailedAction,
  getCVSuccessAction,
  getAllCVsAction,
  getAllCVsFailedAction,
  getAllCVsSuccessAction,
  editCVAction,
  addCVSuccessAction,
  editCVSuccessAction,
  editCVFailedAction,
} from './cv.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { CVService } from 'src/app/modules/employee/services/cv.service';

@Injectable()
export class CVEffects {
  constructor(
    private actions$: Actions,
    private cvService: CVService
  ) {}

  loadAllCVs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCVsAction),
      switchMap(() => {
        return this.cvService.getCVs().pipe(
          map(cvs => getAllCVsSuccessAction({ cvs })),
          catchError((error: HttpErrorResponse) => of(getAllCVsFailedAction(error)))
        );
      })
    )
  );

  loadCV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCVAction),
      switchMap(action => {
        return this.cvService.getCVById(action.id).pipe(
          map(cv => getCVSuccessAction({ cv })),
          catchError((error: HttpErrorResponse) => of(getCVFailedAction(error)))
        );
      })
    )
  );

  createCV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCVAction),
      switchMap(action => {
        return this.cvService.createCV(action.cv).pipe(
          map(cv => addCVSuccessAction({ cv })),
          catchError((error: HttpErrorResponse) => of(addCVFailedAction(error)))
        );
      })
    )
  );

  updateCV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editCVAction),
      switchMap(action => {
        return this.cvService.updateCV(action.id, action.cv).pipe(
          map(cv => editCVSuccessAction({ cv })),
          catchError((error: HttpErrorResponse) => of(editCVFailedAction(error)))
        );
      })
    )
  );
}
