import { EReqStatus } from 'src/app/shared/constants/request.status';

export interface ICoreState {
  departments: string[];
  departmentsRequestStatus: EReqStatus;
  specializations: string[];
  specializationsRequestStatus: EReqStatus;
  error: Error;
}

export const initialCoreState: ICoreState = {
  departments: [],
  specializations: [],
  departmentsRequestStatus: EReqStatus.SUCCESS,
  specializationsRequestStatus: EReqStatus.SUCCESS,
  error: null,
};
