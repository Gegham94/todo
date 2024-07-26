import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
  error: any;
}

const initialState: AuthState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.authFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, state => ({ ...state, user: null }))
);