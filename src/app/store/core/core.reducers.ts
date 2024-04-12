import { createReducer, on } from '@ngrx/store';
import { getCore, getCoreSuccess } from './core.actions';
import { initialCoreState } from './core.state';

export const coreReducers = createReducer(
  initialCoreState,
  on(getCore, state => ({ ...state, value: state.value + 'added' })),

  on(getCoreSuccess, (state, { value }) => ({ value }))
);
