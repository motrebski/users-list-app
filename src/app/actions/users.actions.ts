import { Action } from "@ngrx/store";
import { User } from "./../users.model";

// Action types
export enum ActionTypes {
  FetchAllUsers = "[Users] Fetch all users",
  UpdateAllUsers = "[Users] Update all users",
  FetchAllUsersSuccess = "[Users] Fetch all users success",
  FetchUser = "[User] Fetch user",
  FetchUserSuccess = "[User] Fetch user success"
}

export class FetchAllUsers implements Action {
  readonly type = ActionTypes.FetchAllUsers;
}

export class UpdateAllUsers implements Action {
  readonly type = ActionTypes.UpdateAllUsers;
  constructor(public data: User[] ) {}
}

export class FetchAllUsersSuccess implements Action {
  readonly type = ActionTypes.FetchAllUsersSuccess;
  constructor(public data: User[] ) {}
}

export class FetchUser implements Action {
  readonly type = ActionTypes.FetchUser;
  constructor(public id: string ) {}
}

export class FetchUserSuccess implements Action {
  readonly type = ActionTypes.FetchUserSuccess;
  constructor(public data: User ) {}
}

export type ActionsUnion = FetchAllUsers | UpdateAllUsers | FetchAllUsersSuccess | FetchUser | FetchUserSuccess;
