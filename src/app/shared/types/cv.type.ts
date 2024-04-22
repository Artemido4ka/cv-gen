import { IEmployee } from './employees.types';
import { IFormatedProject, IProject } from './project.types';

export interface CVInterface extends Omit<IEmployee, 'id'> {
  id: number;
  cvName: string;
  language: LanguageInterface[];
  skills: IBasicObjectItem[];
  employeeId: number;
  cvsProjects: IProject[];
}

export interface LanguageInterface {
  id: number;
  level: IBasicObjectItem;
  levelId: number;
  name: IBasicObjectItem;
  nameId: number;
}

export interface CVFormatedInterface
  extends Omit<
    CVInterface,
    'language' | 'skills' | 'cvsProjects' | 'department' | 'specialization'
  > {
  language: FormatedLanguageInterface[];
  skills: string[];
  department: string;
  specialization: string;
  cvsProjects: IFormatedProject[];
}

export interface FormatedLanguageInterface {
  name: string;
  level: string;
}

export interface IBasicObjectItem {
  id: number;
  name: string;
}
