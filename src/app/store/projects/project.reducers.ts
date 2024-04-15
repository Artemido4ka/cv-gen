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
import { EReqStatus } from 'src/app/shared/constants/request.status';

export const projectReducers = createReducer(
  initialProjectState,

  //Get all projects
  on(getProjectsAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(getProjectsSuccessAction, (state, { projects }) => {
    return { ...state, projects, requestStatus: EReqStatus.SUCCESS };
  }),

  on(getProjectsFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Get project by id
  on(getProjectAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(getProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: EReqStatus.SUCCESS };
  }),

  on(getProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Create project
  on(addProjectAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(addProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: EReqStatus.SUCCESS };
  }),

  on(addProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Update project
  on(editProjectAction, state => ({ ...state, requestStatus: EReqStatus.PENDING })),

  on(editProjectSuccessAction, (state, { project }) => {
    return { ...state, project, requestStatus: EReqStatus.SUCCESS, projects: null };
  }),

  on(editProjectFailedAction, (state, { error }) => {
    return { ...state, error, requestStatus: EReqStatus.FAILED };
  }),

  //Get techStack
  on(getTechStackAction, state => ({ ...state, techStackRequestStatus: EReqStatus.PENDING })),

  on(getTechStackSuccessAction, (state, { techStack }) => {
    return { ...state, techStack, techStackRequestStatus: EReqStatus.SUCCESS };
  }),

  on(getTechStackFailedAction, (state, { error }) => {
    return { ...state, error, techStackRequestStatus: EReqStatus.FAILED };
  }),

  //Get teamRoles
  on(getTeamRolesAction, state => ({ ...state, teamRolesRequestStatus: EReqStatus.PENDING })),

  on(getTeamRolesSuccessAction, (state, { teamRoles }) => {
    return { ...state, teamRoles, teamRolesRequestStatus: EReqStatus.SUCCESS };
  }),

  on(getTeamRolesFailedAction, (state, { error }) => {
    return { ...state, error, teamRolesRequestStatus: EReqStatus.FAILED };
  }),
  //Get responsibilities
  on(getResponsibilitiesAction, state => ({
    ...state,
    responsibilitiesRequestStatus: EReqStatus.PENDING,
  })),

  on(getResponsibilitiesSuccessAction, (state, { responsibilities }) => {
    return { ...state, responsibilities, responsibilitiesRequestStatus: EReqStatus.SUCCESS };
  }),

  on(getResponsibilitiesFailedAction, (state, { error }) => {
    return { ...state, error, responsibilitiesRequestStatus: EReqStatus.FAILED };
  })
);
