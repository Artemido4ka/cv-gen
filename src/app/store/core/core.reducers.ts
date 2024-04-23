import { createReducer, on } from '@ngrx/store';
import {
  getDepartmentsAction,
  getDepartmentsFailedAction,
  getDepartmentsSuccessAction,
  getLanguagesAction,
  getLanguagesFailedAction,
  getLanguagesSuccessAction,
  getLevelsAction,
  getLevelsFailedAction,
  getLevelsSuccessAction,
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
  }),

  on(getLanguagesAction, state => ({
    ...state,
    languagesRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getLanguagesSuccessAction, (state, { languages }) => {
    return { ...state, languages, languagesRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getLanguagesFailedAction, (state, { error }) => {
    return { ...state, error, languagesRequestStatus: RequestStatusEnum.FAILED };
  }),

  on(getLevelsAction, state => ({
    ...state,
    levelsRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getLevelsSuccessAction, (state, { levels }) => {
    return { ...state, levels, levelsRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getLevelsFailedAction, (state, { error }) => {
    return { ...state, error, levelsRequestStatus: RequestStatusEnum.FAILED };
  })
);
