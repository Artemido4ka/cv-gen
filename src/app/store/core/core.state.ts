import { RequestStatusEnum } from 'src/app/shared/constants/request.status';

export interface ICoreState {
  departments: string[];
  departmentsRequestStatus: RequestStatusEnum;
  specializations: string[];
  specializationsRequestStatus: RequestStatusEnum;
  languages: string[];
  languagesRequestStatus: RequestStatusEnum;
  levels: string[];
  levelsRequestStatus: RequestStatusEnum;
  error: Error;
}

export const initialCoreState: ICoreState = {
  departments: [],
  specializations: [],
  languages: [],
  levels: [],
  departmentsRequestStatus: RequestStatusEnum.SUCCESS,
  specializationsRequestStatus: RequestStatusEnum.SUCCESS,
  languagesRequestStatus: RequestStatusEnum.SUCCESS,
  levelsRequestStatus: RequestStatusEnum.SUCCESS,
  error: null,
};
