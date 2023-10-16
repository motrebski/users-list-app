import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { UsersTableContainerComponent } from './pages/users-table/users-table-container/users-table-container.component'

// Routing set up
const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'users-data-table', component: UsersTableContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
