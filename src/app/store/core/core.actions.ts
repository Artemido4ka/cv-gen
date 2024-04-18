import { createAction, props } from '@ngrx/store';

export enum ECoreActions {
  GetDepartments = '[Shared API] Get Departments',
  GetDepartmentsSuccess = '[Shared API] Get Departments Success',
  GetDepartmentsError = '[Shared API] Get Departments Error',

  GetSpecializations = '[Shared API] Get Specializations',
  GetSpecializationsSuccess = '[Shared API] Get Specializations Success',
  GetSpecializationsError = '[Shared API] Get Specializations Error',
}

export const getDepartmentsAction = createAction(ECoreActions.GetDepartments);

export const getDepartmentsSuccessAction = createAction(
  ECoreActions.GetDepartmentsSuccess,
  props<{ departments: string[] }>()
);

export const getDepartmentsFailedAction = createAction(
  ECoreActions.GetDepartmentsError,
  props<{ error: Error }>()
);

export const getSpecializationsAction = createAction(ECoreActions.GetDepartments);

export const getSpecializationsSuccessAction = createAction(
  ECoreActions.GetSpecializationsSuccess,
  props<{ specializations: string[] }>()
);

export const getSpecializationsFailedAction = createAction(
  ECoreActions.GetSpecializationsError,
  props<{ error: Error }>()
);
