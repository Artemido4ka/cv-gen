import { RequestStatusEnum } from 'src/app/shared/constants/request.status';

export interface ICoreState {
  departments: string[];
  departmentsRequestStatus: RequestStatusEnum;
  specializations: string[];
  specializationsRequestStatus: RequestStatusEnum;
  error: Error;
}

export const initialCoreState: ICoreState = {
  departments: [],
  specializations: [],
  departmentsRequestStatus: RequestStatusEnum.SUCCESS,
  specializationsRequestStatus: RequestStatusEnum.SUCCESS,
  error: null,
};
