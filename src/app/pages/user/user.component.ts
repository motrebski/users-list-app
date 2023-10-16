import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { FetchUser } from "src/app/actions/users.actions";
import { ActivatedRoute } from '@angular/router';
import { user, userLoading } from 'src/app/reducers';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Get data from store
  user$ = this.store.select(user);
  isLoading$ = this.store.select(userLoading);
  skeletonItems = Array(5).fill(0);
  userDataKeys = ['name', 'email', 'username', 'phone', 'website'];

  constructor(private store: Store<any>,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Pass id to FetchUser action
    this.store.dispatch(new FetchUser(this.route.snapshot.paramMap.get('id') as string));
  }

}
