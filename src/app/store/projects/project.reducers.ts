import { createReducer, on } from '@ngrx/store';
import { initialProjectState } from './project.state';
import {
  getProjectsAction,
  getProjectsFailedAction,
  getProjectsSuccessAction,
} from './project.actions';
import { EReqStatus } from 'src/app/shared/constants/request.status';

export const projectReducers = createReducer(
  initialProjectState,
  on(getProjectsAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(getProjectsSuccessAction, (state, { projects }) => {
    return { ...state, projects, requestStatus: EReqStatus.SUCCESS };
  }),

  on(getProjectsFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  })
);
