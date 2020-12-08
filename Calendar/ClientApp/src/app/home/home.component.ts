import { Component } from '@angular/core';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {


    constructor(public dialog: MatDialog) { }

    public openRegisterDialog(): void {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '450px',
            height: '665px'
        });

        dialogRef.afterClosed().subscribe();
    }

    public openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '450px',
            height: '405px'
        });

        dialogRef.afterClosed().subscribe();
    }
}
