import { ActionTypes, ActionsUnion}  from "../actions/users.actions";
import { User } from "../users.model";

export interface UsersState {
  allUsers: User[];
  allUsersLoading: boolean;
  user: Record<string, any>;
  userLoading: boolean;
}

export const initialState: UsersState = {
  allUsers: [],
  allUsersLoading: false,
  user: {},
  userLoading: false
};

// Create reducer
export function reducer(
  state = initialState,
  action: ActionsUnion
): UsersState {
  switch (action.type) {
    case ActionTypes.FetchAllUsers: {
      return {
        ...state,
        allUsersLoading: true,
      };
    }
    case ActionTypes.UpdateAllUsers: {
      return {
        ...state,
        allUsersLoading: true,
      };
    }
    case ActionTypes.FetchAllUsersSuccess: {
      return {
        ...state,
        allUsersLoading: false,
        allUsers: action.data,
      };
    }
    case ActionTypes.FetchUser: {
      return {
        ...state,
        userLoading: true,
      };
    }
    case ActionTypes.FetchUserSuccess: {
      return {
        ...state,
        userLoading: false,
        user: action.data,
      };
    }
    default: {
      return state;
    }
  }
}

// Get data from store
export const getAllUsers = (state: UsersState) => state.allUsers;
export const getAllUsersLoading = (state: UsersState) => state.allUsersLoading;

export const getUser = (state: UsersState) => state.user;
export const getUserLoading = (state: UsersState) => state.userLoading;
