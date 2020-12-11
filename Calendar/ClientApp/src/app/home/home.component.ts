import { Component, OnInit} from '@angular/core';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Router } from '@angular/router';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    constructor(public dialog: MatDialog, private router: Router) { }

    ngOnInit(): void {
        if(JSON.parse(localStorage.getItem("currentUser")) != null){
            //this.router.navigate(['/calendar']);
        }
    }

    public openRegisterDialog(): void {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '450px',
            height: '630px'
        });

        dialogRef.afterClosed().subscribe();
    }

    public openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '450px',
            height: '370px'
        });

        dialogRef.afterClosed().subscribe();
    }
}
