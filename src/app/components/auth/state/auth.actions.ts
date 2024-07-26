import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.interface';

export const login = createAction('[Auth] Login', props<IUser>());
export const logout = createAction('[Auth] Logout');
export const register = createAction('[Auth] Register', props<IUser>());
export const authSuccess = createAction('[Auth] Auth Success', props<{ user: any }>());
export const authFailure = createAction('[Auth] Auth Failure', props<{ error: any }>());