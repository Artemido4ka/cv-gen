import { createReducer, on } from '@ngrx/store';
import { initialCVState } from './cv.state';
import {
  addCVAction,
  addCVFailedAction,
  addCVSuccessAction,
  editCVAction,
  editCVFailedAction,
  editCVSuccessAction,
  getCVAction,
  getCVFailedAction,
  getCVSuccessAction,
  getAllCVsAction,
  getAllCVsFailedAction,
  getAllCVsSuccessAction,
} from './cv.actions';
import { RequestStatusEnum } from 'src/app/shared/constants/request.status';

export const cvReducers = createReducer(
  initialCVState,

  //Get all CVs
  on(getAllCVsAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getAllCVsSuccessAction, (state, { cvs }) => {
    return { ...state, cvs, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getAllCVsFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Get CV by id
  on(getCVAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getCVSuccessAction, (state, { cv }) => {
    return { ...state, cv, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getCVFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Create CV
  on(addCVAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(addCVSuccessAction, (state, { cv }) => {
    return { ...state, cv, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(addCVFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Update CV
  on(editCVAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(editCVSuccessAction, (state, { cv }) => {
    return { ...state, cv, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(editCVFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  })
);
