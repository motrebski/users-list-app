import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { FetchAllUsers } from "src/app/actions/users.actions";
import { allUsersLoading } from 'src/app/reducers';

// Container for users data table component 
@Component({
  selector: 'users-table-container',
  templateUrl: './users-table-container.component.html'
})
export class UsersTableContainerComponent {
  isLoading$ = this.store.select(allUsersLoading);
  constructor(private store: Store<any>) { }

  ngOnInit() {
    // Fetch all users
    this.store.dispatch(new FetchAllUsers());
  }
}
