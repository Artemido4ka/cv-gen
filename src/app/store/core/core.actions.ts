import { Action, createAction, props } from '@ngrx/store';
import { ICore } from './core.state';

export enum ECoreActions {
  GetCore = '[Core] Get Core',
  GetCoreSuccess = '[Core] Get Core Success',
}

// export class GetCore implements Action {
//   public readonly type = ECoreActions.GetCore;
// }

// export class GetCoreSuccess implements Action {
//   public readonly type = ECoreActions.GetCoreSuccess;
//   constructor(public payload: ICore) {}
// }

// export type CoreActions = GetCore | GetCoreSuccess;

export const getCore = createAction(ECoreActions.GetCore);

export const getCoreSuccess = createAction(ECoreActions.GetCoreSuccess, props<{ value: string }>());
