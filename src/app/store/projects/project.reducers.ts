import { createReducer, on } from '@ngrx/store';
import { initialProjectState } from './project.state';
import {
  addProjectAction,
  addProjectFailedAction,
  addProjectSuccessAction,
  editProjectAction,
  editProjectFailedAction,
  editProjectSuccessAction,
  getProjectAction,
  getProjectFailedAction,
  getProjectSuccessAction,
  getProjectsAction,
  getProjectsFailedAction,
  getProjectsSuccessAction,
  getResponsibilitiesAction,
  getResponsibilitiesFailedAction,
  getResponsibilitiesSuccessAction,
  getTeamRolesAction,
  getTeamRolesFailedAction,
  getTeamRolesSuccessAction,
  getTechStackAction,
  getTechStackFailedAction,
  getTechStackSuccessAction,
} from './project.actions';
import { RequestStatusEnum } from 'src/app/shared/constants/request.status';

export const projectReducers = createReducer(
  initialProjectState,

  //Get all projects
  on(getProjectsAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getProjectsSuccessAction, (state, { projects }) => {
    return { ...state, projects, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getProjectsFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Get project by id
  on(getProjectAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(getProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Create project
  on(addProjectAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(addProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(addProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Update project
  on(editProjectAction, state => ({ ...state, requestStatus: RequestStatusEnum.PENDING })),

  on(editProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(editProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: RequestStatusEnum.FAILED };
  }),

  //Get techStack
  on(getTechStackAction, state => ({
    ...state,
    techStackRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getTechStackSuccessAction, (state, { techStack }) => {
    return { ...state, techStack, techStackRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getTechStackFailedAction, (state, { error }) => {
    return { ...state, error, techStackRequestStatus: RequestStatusEnum.FAILED };
  }),

  //Get teamRoles
  on(getTeamRolesAction, state => ({
    ...state,
    teamRolesRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getTeamRolesSuccessAction, (state, { teamRoles }) => {
    return { ...state, teamRoles, teamRolesRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getTeamRolesFailedAction, (state, { error }) => {
    return { ...state, error, teamRolesRequestStatus: RequestStatusEnum.FAILED };
  }),
  //Get responsibilities
  on(getResponsibilitiesAction, state => ({
    ...state,
    responsibilitiesRequestStatus: RequestStatusEnum.PENDING,
  })),

  on(getResponsibilitiesSuccessAction, (state, { responsibilities }) => {
    return { ...state, responsibilities, responsibilitiesRequestStatus: RequestStatusEnum.SUCCESS };
  }),

  on(getResponsibilitiesFailedAction, (state, { error }) => {
    return { ...state, error, responsibilitiesRequestStatus: RequestStatusEnum.FAILED };
  })
);
