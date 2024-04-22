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
import { RequestStatusEnum } from 'src/app/shared/constants/request.status';

export const coreReducers = createReducer(
  initialCoreState,

  on(getDepartmentsAction, state => ({
    ...state,
    departmentsRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getDepartmentsSuccessAction, (state, { departments }) => {
    return { ...state, departments, departmentsRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getDepartmentsFailedAction, (state, { error }) => {
    return { ...state, error, departmentsRequestStatus: RequestStatusEnum.FAILED };
  }),

  on(getSpecializationsAction, state => ({
    ...state,
    specializationsRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getSpecializationsSuccessAction, (state, { specializations }) => {
    return { ...state, specializations, specializationsRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getSpecializationsFailedAction, (state, { error }) => {
    return { ...state, error, specializationsRequestStatus: RequestStatusEnum.FAILED };
  })
);
