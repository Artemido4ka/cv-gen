import { createReducer, on } from '@ngrx/store';
import {
  getDepartmentsAction,
  getDepartmentsFailedAction,
  getDepartmentsSuccessAction,
  getSpecializationsAction,
  getSpecializationsFailedAction,
  getSpecializationsSuccessAction,
} from './core.actions';
import { initialCoreState } from './core.state';
import { EReqStatus } from 'src/app/shared/constants/request.status';

export const coreReducers = createReducer(
  initialCoreState,

  on(getDepartmentsAction, state => ({ ...state, departmentsRequestStatus: EReqStatus.PENDING })),

  on(getDepartmentsSuccessAction, (state, { departments }) => {
    return { ...state, departments, departmentsRequestStatus: EReqStatus.SUCCESS };
  }),

  on(getDepartmentsFailedAction, (state, { error }) => {
    return { ...state, error, departmentsRequestStatus: EReqStatus.FAILED };
  }),

  on(getSpecializationsAction, state => ({
    ...state,
    specializationsRequestStatus: EReqStatus.PENDING,
  })),

  on(getSpecializationsSuccessAction, (state, { specializations }) => {
    return { ...state, specializations, specializationsRequestStatus: EReqStatus.SUCCESS };
  }),

  on(getSpecializationsFailedAction, (state, { error }) => {
    return { ...state, error, specializationsRequestStatus: EReqStatus.FAILED };
  })
);
