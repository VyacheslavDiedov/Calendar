import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarApiService } from "../../service/calendar-api.service";
import { UserData } from "../../models/user-data";
import { LoginData } from 'src/models/login-data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

    public userLoginInput: string = '';
    public userPasswordInput: string = '';
    public error: boolean = false;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
                public APIService: CalendarApiService,
                private router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    loginUser(): void {
        const userToLogin: LoginData = new LoginData(
            this.userLoginInput,
            this.userPasswordInput
        );


        let user: UserData = null;

        this.APIService.UserLogin(userToLogin).subscribe(response => {
                user = response;
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.router.navigate(['/calendar']);
                this.dialogRef.close();
            },
            error => {
                localStorage.removeItem("currentUser");
                this.error = true;
            });


    }
}
