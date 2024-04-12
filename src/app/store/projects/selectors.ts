import { createSelector } from '@ngrx/store';
import { IProjectsState } from './project.state';
import { IAppState } from '../app.store';

const selectUsers = (state: IAppState) => state.projectsState;

export const selectProjects = createSelector(
  selectUsers,
  (state: IProjectsState) => state.projects
);

export const selectProjectReqStatus = createSelector(
  selectUsers,
  (state: IProjectsState) => state.requestStatus
);

export const selectProjectError = createSelector(
  selectUsers,
  (state: IProjectsState) => state.error
);
