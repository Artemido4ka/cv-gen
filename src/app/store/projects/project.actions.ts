import { createAction, props } from '@ngrx/store';
import { IFormatedProject } from 'src/app/shared/types/project.types';

export enum EProjectActions {
  GetProjects = '[Project API] Get Projects',
  GetProjectsSuccess = '[Project API] Get Projects Success',
  GetProjectsError = '[Project API] Get Projects Error',
  GetProject = '[Project API] Get Project',
  GetProjectSuccess = '[Project API] Get Project Success',
  GetProjectError = '[Project API] Get Project Error',
  AddProject = '[Project API] Add Project',
  AddProjectSuccess = '[Project API] Add Project Success',
  AddProjectError = '[Project API] Add Project Error',
  EditProject = '[Project API] Edit Project',
  EditProjectSuccess = '[Project API] Edit Project Success',
  EditProjectError = '[Project API] Edit Project Error',
}

//Get all projects
export const getProjectsAction = createAction(EProjectActions.GetProjects);

export const getProjectsSuccessAction = createAction(
  EProjectActions.GetProjectsSuccess,
  props<{ projects: IFormatedProject[] }>()
);

export const getProjectsFailedAction = createAction(
  EProjectActions.GetProjectsError,
  props<{ error: Error }>()
);

//Get project by id
export const getProjectAction = createAction(EProjectActions.GetProject, props<{ id: number }>());

export const getProjectSuccessAction = createAction(
  EProjectActions.GetProjectSuccess,
  props<{ project: IFormatedProject }>()
);

export const getProjectFailedAction = createAction(
  EProjectActions.GetProjectError,
  props<{ error: Error }>()
);

//Create project
export const addProjectAction = createAction(
  EProjectActions.AddProject,
  props<{ project: IFormatedProject }>()
);

export const addProjectSuccessAction = createAction(
  EProjectActions.AddProjectSuccess,
  props<{ project: IFormatedProject }>()
);

export const addProjectFailedAction = createAction(
  EProjectActions.AddProjectError,
  props<{ error: Error }>()
);

//Update project
export const editProjectAction = createAction(
  EProjectActions.EditProject,
  props<{ id: number; project: IFormatedProject }>()
);

export const editProjectSuccessAction = createAction(
  EProjectActions.EditProjectSuccess,
  props<{ project: IFormatedProject }>()
);

export const editProjectFailedAction = createAction(
  EProjectActions.EditProjectError,
  props<{ error: Error }>()
);
