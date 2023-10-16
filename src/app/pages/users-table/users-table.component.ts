import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { UpdateAllUsers } from "src/app/actions/users.actions";
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { allUsers, allUsersLoading } from 'src/app/reducers';
import { Subscription } from 'rxjs';

// Component for handling data table
@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements AfterViewInit {
  // Get data from store
  users$ = this.store.select(allUsers);
  isLoading$ = this.store.select(allUsersLoading);
  @Input() dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['id', 'name', 'email', 'username', 'website'];
  storeSubscription!: Subscription;
  dialogRefSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<any>, private dialog: MatDialog) { }

  ngAfterViewInit() {

    // Subscribe to store and set up pagination with sorting
    this.storeSubscription = this.store.select(allUsers).subscribe((data) => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    });
  }

  // Filter data with removing white space and lowering letters
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  doubleClick(event: Event) {
    this.openDialog(event);
  }

  // Open dialog and handle results after close
  openDialog(event: Event) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {...event},
      panelClass: 'custom-modalbox'
    });
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) this.store.dispatch(new UpdateAllUsers(result));
      
    });
  }

  ngOnDestroy() {
    // Unsubscribe on ngOnDestroy
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
    if (this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }
}
