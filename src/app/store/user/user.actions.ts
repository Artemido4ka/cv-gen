import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/types/user.types';

export enum EUserActions {
  LoginUser = '[Auth API] Login User',
  LoginUserSuccess = '[Auth API] Login User Success',
  LoginUserError = '[Auth API] Login User Error',
}

export const loginUserAction = createAction(EUserActions.LoginUser, props<{ user: IUser }>());

export const loginUserSuccessAction = createAction(EUserActions.LoginUserSuccess);

export const loginUserFailedAction = createAction(
  EUserActions.LoginUserError,
  props<{ error: Error }>()
);
