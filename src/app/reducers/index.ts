import {
  ActionReducerMap,
  createSelector
} from '@ngrx/store';
import { reducer, UsersState, getAllUsers, getAllUsersLoading, getUser, getUserLoading } from './users.reducer';

export interface AppState {
  data: UsersState;
}

// Reducer configuration
export const reducers: ActionReducerMap<AppState, any> = {
  data: reducer,
};

export const getDataState = (state: AppState) => state.data;

// Create selectors for components
export const allUsers = createSelector(getDataState, getAllUsers);
export const allUsersLoading = createSelector(getDataState, getAllUsersLoading);

export const user = createSelector(getDataState, getUser);
export const userLoading = createSelector(getDataState, getUserLoading);
