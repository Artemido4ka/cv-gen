import { EReqStatus } from 'src/app/shared/constants/request.status';
import { IFormatedProject } from 'src/app/shared/types/project.types';

export interface IProjectsState {
  projects: IFormatedProject[];
  requestStatus: EReqStatus;
  error: Error;
}

export const initialProjectState: IProjectsState = {
  projects: null,
  requestStatus: EReqStatus.SUCCESS,
  error: null,
};
