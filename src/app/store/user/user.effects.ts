import { AuthService } from './../../modules/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { loginUserAction, loginUserFailedAction, loginUserSuccessAction } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserAction),
      switchMap(action => {
        return this.authService.login(action.user).pipe(
          map(loginUserSuccessAction),
          catchError((error: HttpErrorResponse) => of(loginUserFailedAction(error)))
        );
      })
    )
  );
}
