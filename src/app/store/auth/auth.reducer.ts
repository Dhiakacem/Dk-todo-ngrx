import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
    on(AuthActions.logout, () => initialState)
  )
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectUser
} = authFeature;

