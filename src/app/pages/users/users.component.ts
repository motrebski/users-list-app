import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { FetchAllUsers } from "src/app/actions/users.actions";
import { allUsers, allUsersLoading } from 'src/app/reducers';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

// Component displaying users in grid layout
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // Data from store
  users$ = this.store.select(allUsers);
  isLoading$ = this.store.select(allUsersLoading);
  cols = 3;
  skeletonItems = Array(10).fill(0);
  breakpointObserverSubscription!: Subscription;

  constructor(private store: Store<any>,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    // Fetch all users
    this.store.dispatch(new FetchAllUsers());
    // Subscribe to BreakpointObserver
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe(['(min-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) this.cols = 3;
        else this.cols = 2;
      });
  }

  ngOnDestroy() {
    // Unsubscribe on ngOnDestroy
    if (this.breakpointObserverSubscription) this.breakpointObserverSubscription.unsubscribe();
  }
  
}
