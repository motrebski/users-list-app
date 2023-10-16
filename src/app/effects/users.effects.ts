import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { UsersService } from '../users.service';
import { ActionTypes, FetchAllUsersSuccess, FetchUserSuccess } from "../actions/users.actions";
import { AppState } from './../reducers/index';
import { User } from "../users.model";

@Injectable()
export class UsersEffect {
  constructor(private actions: Actions,
    private usersService: UsersService,
    private store$: Store<AppState>) {}

  // Effect for handling fetching all users data
  fetchAllUsers$ = createEffect(() => this.actions.pipe(
    ofType(ActionTypes.FetchAllUsers),
    switchMap(() => this.usersService.getAllUsers()
      .pipe(
        map(data => new FetchAllUsersSuccess(data))
      ))
    )
  );

  // Effect for handling fetching user data by given id 
  fetchUser$ = createEffect(() => this.actions.pipe(
    ofType(ActionTypes.FetchUser),
    switchMap((action: {id: number}) => this.usersService.getUser(action.id)
      .pipe(
        map((data) => new FetchUserSuccess(data))
      ))
    )
  );

  // Effect for handling updating user data by given id 
  updateUsers$ = createEffect(() => this.actions.pipe(
    ofType(ActionTypes.UpdateAllUsers),
    withLatestFrom(this.store$),
    map(([action, storeState]: [{data: User}, AppState]) => new FetchAllUsersSuccess( 
      [...storeState.data.allUsers.map((user: User) =>
        user.id === action.data.id ? { ...action.data } : user
      )]
      ))
    )
  );
}
