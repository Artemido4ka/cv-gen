import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.store';
import { IUserState } from './user.state';

const selectUserState = (state: IAppState) => state.userState;

export const selectUserReqStatus = createSelector(
  selectUserState,
  (state: IUserState) => state.requestStatus
);
