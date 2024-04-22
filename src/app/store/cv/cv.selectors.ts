import { createSelector } from '@ngrx/store';
import { ICVState } from './cv.state';
import { IAppState } from '../app.store';

const selectCVState = (state: IAppState) => state.cvState;

export const selectCVs = createSelector(selectCVState, (state: ICVState) => state.cvs);

export const selectCV = createSelector(selectCVState, (state: ICVState) => state.cv);

export const selectCVReqStatus = createSelector(
  selectCVState,
  (state: ICVState) => state.requestStatus
);

export const selectCVError = createSelector(selectCVState, (state: ICVState) => state.error);
