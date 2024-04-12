import { createAction, props } from '@ngrx/store';
import { IFormatedProject } from 'src/app/shared/types/project.types';

export enum EProjectActions {
  GetProjects = '[Project API] Get Projects',
  GetProjectsSuccess = '[Project API] Get Projects Success',
  GetProjectsError = '[Project API] Get Projects Error',
}

export const getProjectsAction = createAction(EProjectActions.GetProjects);

export const getProjectsSuccessAction = createAction(
  EProjectActions.GetProjectsSuccess,
  props<{ projects: IFormatedProject[] }>()
);

export const getProjectsFailedAction = createAction(
  EProjectActions.GetProjectsError,
  props<{ error: Error }>()
);
