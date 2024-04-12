import { Action, ActionReducerMap } from '@ngrx/store';
import { coreReducers } from './core/core.reducers';
import { ICore } from './core/core.state';
import { IProjectsState } from './projects/project.state';
import { projectReducers } from './projects/project.reducers';

export interface IAppState {
  core: ICore;
  projectsState: IProjectsState;
}

export const appReducers: ActionReducerMap<IAppState, Action> = {
  core: coreReducers,
  projectsState: projectReducers,
};
