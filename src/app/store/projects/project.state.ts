import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import {
  FormatedResponsibilityT,
  FormatedTeamRoleT,
  FormatedTechStackItemT,
  IFormatedProject,
} from 'src/app/shared/types/project.types';

export interface IProjectsState {
  projects: IFormatedProject[];
  project: IFormatedProject;
  requestStatus: RequestStatusEnum;
  error: Error;
  techStack: FormatedTechStackItemT[];
  techStackRequestStatus: RequestStatusEnum;
  teamRoles: FormatedTeamRoleT[];
  teamRolesRequestStatus: RequestStatusEnum;
  responsibilities: FormatedResponsibilityT[];
  responsibilitiesRequestStatus: RequestStatusEnum;
}

export const initialProjectState: IProjectsState = {
  projects: null,
  project: null,
  requestStatus: RequestStatusEnum.SUCCESS,
  error: null,
  techStack: [],
  techStackRequestStatus: RequestStatusEnum.SUCCESS,
  teamRoles: [],
  teamRolesRequestStatus: RequestStatusEnum.SUCCESS,
  responsibilities: [],
  responsibilitiesRequestStatus: RequestStatusEnum.SUCCESS,
};
