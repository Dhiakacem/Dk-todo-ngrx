import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string }>()
);

export const logout = createAction('[Auth] Logout');

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: User | null }>()
);

