import { EReqStatus } from 'src/app/shared/constants/request.status';
import {
  FormatedResponsibilityT,
  FormatedTeamRoleT,
  FormatedTechStackItemT,
  IFormatedProject,
} from 'src/app/shared/types/project.types';

export interface IProjectsState {
  projects: IFormatedProject[];
  project: IFormatedProject;
  requestStatus: EReqStatus;
  error: Error;
  techStack: FormatedTechStackItemT[];
  techStackRequestStatus: EReqStatus;
  teamRoles: FormatedTeamRoleT[];
  teamRolesRequestStatus: EReqStatus;
  responsibilities: FormatedResponsibilityT[];
  responsibilitiesRequestStatus: EReqStatus;
}

export const initialProjectState: IProjectsState = {
  projects: null,
  project: null,
  requestStatus: EReqStatus.SUCCESS,
  error: null,
  techStack: [],
  techStackRequestStatus: EReqStatus.SUCCESS,
  teamRoles: [],
  teamRolesRequestStatus: EReqStatus.SUCCESS,
  responsibilities: [],
  responsibilitiesRequestStatus: EReqStatus.SUCCESS,
};
