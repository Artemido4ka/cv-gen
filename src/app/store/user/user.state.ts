import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import { IUser } from 'src/app/shared/types/user.types';

export interface IUserState {
  user: IUser;

  requestStatus: RequestStatusEnum;
  error: Error;
}

export const initialUserState: IUserState = {
  user: null,
  requestStatus: RequestStatusEnum.SUCCESS,
  error: null,
};
