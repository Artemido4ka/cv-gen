import { CVFormatedInterface, CVInterface } from './cv.type';

export interface IBasicObjectItem {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: IBasicObjectItem;
  specialization: IBasicObjectItem;
  departmentId: number;
  specializationId: number;
  cvs: CVInterface[];
}

export interface IFormatedEmployee
  extends Omit<IEmployee, 'department' | 'specialization' | 'cvs'> {
  department: string;
  specialization: string;
  cvs: CVFormatedInterface[];
}

export type RequestEmployeeT = Omit<IFormatedEmployee, 'id' | 'departmentId' | 'specializationId'>;
