export interface IBasicObjectItem {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  email: string;
  department: IBasicObjectItem;
  specialization: IBasicObjectItem;
  departmentId: number;
  specializationId: number;
}

export interface IFormatedEmployee extends Omit<IEmployee, 'department' | 'specialization'> {
  department: string;
  specialization: string;
}
