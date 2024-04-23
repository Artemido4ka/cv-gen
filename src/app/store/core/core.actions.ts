import { createAction, props } from '@ngrx/store';

export enum ECoreActions {
  GetDepartments = '[Shared API] Get Departments',
  GetDepartmentsSuccess = '[Shared API] Get Departments Success',
  GetDepartmentsError = '[Shared API] Get Departments Error',

  GetSpecializations = '[Shared API] Get Specializations',
  GetSpecializationsSuccess = '[Shared API] Get Specializations Success',
  GetSpecializationsError = '[Shared API] Get Specializations Error',

  GetLanguages = '[Shared API] Get Languages',
  GetLanguagesSuccess = '[Shared API] Get Languages Success',
  GetLanguagesError = '[Shared API] Get Languages Error',

  GetLevels = '[Shared API] Get Levels',
  GetLevelsSuccess = '[Shared API] Get Levels Success',
  GetLevelsError = '[Shared API] Get Levels Error',
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

export const getLanguagesAction = createAction(ECoreActions.GetLanguages);

export const getLanguagesSuccessAction = createAction(
  ECoreActions.GetLanguagesSuccess,
  props<{ languages: string[] }>()
);

export const getLanguagesFailedAction = createAction(
  ECoreActions.GetLanguagesError,
  props<{ error: Error }>()
);


export const getLevelsAction = createAction(ECoreActions.GetLevels);

export const getLevelsSuccessAction = createAction(
  ECoreActions.GetLevelsSuccess,
  props<{ levels: string[] }>()
);

export const getLevelsFailedAction = createAction(
  ECoreActions.GetLevelsError,
  props<{ error: Error }>()
);
