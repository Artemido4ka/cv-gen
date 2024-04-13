import { createReducer, on } from '@ngrx/store';
import { EReqStatus } from 'src/app/shared/constants/request.status';
import { loginUserAction, loginUserFailedAction, loginUserSuccessAction } from './user.actions';
import { initialUserState } from './user.state';

export const userReducers = createReducer(
  initialUserState,

  on(loginUserAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(loginUserSuccessAction, state => {
    return { ...state, requestStatus: EReqStatus.SUCCESS };
  }),

  on(loginUserFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  })
);
