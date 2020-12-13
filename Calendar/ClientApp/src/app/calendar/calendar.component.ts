import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) { }

  currentUser: any = null;

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if( this.currentUser == null){
          this.router.navigate(['']);
      }
  }

    logout(): void{
        localStorage.removeItem("currentUser");
        this.router.navigate(['']);
    }

    public openEditUserDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            width: '450px',
            height: '560px'
        });
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        dialogRef.afterClosed().subscribe();
    }
}
