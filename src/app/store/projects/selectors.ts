import { createSelector } from '@ngrx/store';
import { IProjectsState } from './project.state';
import { IAppState } from '../app.store';

const selectProjectsState = (state: IAppState) => state.projectsState;

export const selectProjects = createSelector(
  selectProjectsState,
  (state: IProjectsState) => state.projects
);

export const selectProjectReqStatus = createSelector(
  selectProjectsState,
  (state: IProjectsState) => state.requestStatus
);

export const selectProjectError = createSelector(
  selectProjectsState,
  (state: IProjectsState) => state.error
);

export const selectProject = createSelector(
  selectProjectsState,
  (state: IProjectsState) => state.project
);
