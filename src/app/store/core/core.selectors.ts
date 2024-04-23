import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.store';
import { ICoreState } from './core.state';

const selectCoreState = (state: IAppState) => state.core;

export const selectDepartments = createSelector(
  selectCoreState,
  (state: ICoreState) => state.departments
);

export const selectDepartmentsRequestStatus = createSelector(
  selectCoreState,
  (state: ICoreState) => state.departmentsRequestStatus
);

export const selectSpecializations = createSelector(
  selectCoreState,
  (state: ICoreState) => state.specializations
);

export const selectSpecializationsRequestStatus = createSelector(
  selectCoreState,
  (state: ICoreState) => state.specializationsRequestStatus
);

export const selectLanguages = createSelector(
  selectCoreState,
  (state: ICoreState) => state.languages
);

export const selectLevels = createSelector(selectCoreState, (state: ICoreState) => state.levels);
