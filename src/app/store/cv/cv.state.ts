import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import { CVFormatedInterface } from 'src/app/shared/types/cv.type';

export interface ICVState {
  cvs: CVFormatedInterface[];
  cv: CVFormatedInterface;
  requestStatus: RequestStatusEnum;
  error: Error;
}

export const initialCVState: ICVState = {
  cvs: [],
  cv: null,
  requestStatus: RequestStatusEnum.SUCCESS,
  error: null,
};
