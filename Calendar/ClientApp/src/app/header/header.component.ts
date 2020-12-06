import { Component, OnInit } from '@angular/core';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(public dialog: MatDialog) { }

    openRegisterDialog(): void {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '450px',
            height: '665px'
        });

        dialogRef.afterClosed().subscribe();
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '450px',
            height: '405px'
        });

        dialogRef.afterClosed().subscribe();
    }
}


