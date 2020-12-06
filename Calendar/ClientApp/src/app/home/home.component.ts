import { Component } from '@angular/core';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {MatDialog} from '@angular/material/dialog';

export class UserData {
    constructor(
        public userFirstName: string = '',
        public userLastName: string = '',
        public userEMail: string = '',
        public userPhone: string = '',
        public password: string = ''
    ) { }
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {


    constructor(public dialog: MatDialog) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '450px',
            height: '665px'
        });

        dialogRef.afterClosed().subscribe();
    }
}
