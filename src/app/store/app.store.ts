import { Action, ActionReducerMap } from '@ngrx/store';
import { coreReducers } from './core/core.reducers';
import { ICoreState } from './core/core.state';
import { IProjectsState } from './projects/project.state';
import { projectReducers } from './projects/project.reducers';
import { IUserState } from './user/user.state';
import { userReducers } from './user/user.reducers';
import { IEmployeesState } from './employees/employees.state';
import { employeesReducers } from './employees/employees.reducers';
import { ICVState } from './cv/cv.state';
import { cvReducers } from './cv/cv.reducers';

export interface IAppState {
  core: ICoreState;
  projectsState: IProjectsState;
  userState: IUserState;
  employeesState: IEmployeesState;
  cvState: ICVState;
}

export const appReducers: ActionReducerMap<IAppState, Action> = {
  core: coreReducers,
  projectsState: projectReducers,
  userState: userReducers,
  employeesState: employeesReducers,
  cvState: cvReducers,
};
