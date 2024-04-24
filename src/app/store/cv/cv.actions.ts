import { createAction, props } from '@ngrx/store';
import { CVFormatedInterface } from 'src/app/shared/types/cv.type';

export enum CVActionsEnum {
  GetCVs = '[CV API] Get CVs',
  GetCVsSuccess = '[CV API] Get CVs Success',
  GetCVsError = '[CV API] Get CVs Error',
  GetCV = '[CV API] Get CV',
  GetCVSuccess = '[CV API] Get CV Success',
  GetCVError = '[CV API] Get CV Error',
  AddCV = '[CV API] Add CV',
  AddCVSuccess = '[CV API] Add CV Success',
  AddCVError = '[CV API] Add CV Error',
  EditCV = '[CV API] Edit CV',
  EditCVSuccess = '[CV API] Edit CV Success',
  EditCVError = '[CV API] Edit CV Error',
  DeleteCV = '[CV API] Delete CV',
  DeleteCVSuccess = '[CV API] Delete CV Success',
  DeleteCVError = '[CV API] Delete CV Error',
}

//Get all CVs
export const getAllCVsAction = createAction(CVActionsEnum.GetCVs);

export const getAllCVsSuccessAction = createAction(
  CVActionsEnum.GetCVsSuccess,
  props<{ cvs: CVFormatedInterface[] }>()
);

export const getAllCVsFailedAction = createAction(
  CVActionsEnum.GetCVsError,
  props<{ error: Error }>()
);

//Get CV by id
export const getCVAction = createAction(CVActionsEnum.GetCV, props<{ id: number }>());

export const getCVSuccessAction = createAction(
  CVActionsEnum.GetCVSuccess,
  props<{ cv: CVFormatedInterface }>()
);

export const getCVFailedAction = createAction(CVActionsEnum.GetCVError, props<{ error: Error }>());

//Create CV
export const addCVAction = createAction(CVActionsEnum.AddCV, props<{ cv: CVFormatedInterface }>());

export const addCVSuccessAction = createAction(
  CVActionsEnum.AddCVSuccess,
  props<{ cv: CVFormatedInterface }>()
);

export const addCVFailedAction = createAction(CVActionsEnum.AddCVError, props<{ error: Error }>());

//Update CV
export const editCVAction = createAction(
  CVActionsEnum.EditCV,
  props<{ id: number; cv: CVFormatedInterface }>()
);

export const editCVSuccessAction = createAction(
  CVActionsEnum.EditCVSuccess,
  props<{ cv: CVFormatedInterface }>()
);

export const editCVFailedAction = createAction(
  CVActionsEnum.EditCVError,
  props<{ error: Error }>()
);

//Delete CV
export const deleteCVAction = createAction(CVActionsEnum.DeleteCV, props<{ id: number }>());

export const deleteCVSuccessAction = createAction(
  CVActionsEnum.DeleteCVSuccess,
  props<{ cv: CVFormatedInterface }>()
);

export const deleteCVFailedAction = createAction(
  CVActionsEnum.DeleteCVError,
  props<{ error: Error }>()
);
