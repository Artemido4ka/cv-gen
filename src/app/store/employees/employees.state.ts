import { EReqStatus } from 'src/app/shared/constants/request.status';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';

export interface IEmployeesState {
  employees: IFormatedEmployee[];
  employee: IFormatedEmployee;
  requestStatus: EReqStatus;
  error: Error;
}

export const initialEmployeesState: IEmployeesState = {
  employees: null,
  employee: null,
  requestStatus: EReqStatus.SUCCESS,
  error: null,
};
