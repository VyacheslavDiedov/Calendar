import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CalendarApiService} from "../../service/calendar-api.service";
import {UserData} from "../../models/user-data";
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {

    public userFirstNameInput: string = '';
    public userLastNameInput: string = '';
    public userEMailInput: string = '';
    public userPhoneInput: string = '';
    public passwordInput: string = '';
    public error: boolean = false;

    constructor(public dialogRefRegister: MatDialogRef<RegisterDialogComponent>,
                public APIService: CalendarApiService,
                private router: Router) {}

    onNoClick(): void {
        this.dialogRefRegister.close();
    }

    registerUser(): void {
        const userToRegister: UserData = new UserData(
            this.userFirstNameInput,
            this.userLastNameInput,
            this.userEMailInput,
            this.userPhoneInput,
            this.passwordInput
        );

        this.APIService.AddUser(userToRegister).subscribe(
            response => {
                let user: UserData = response;
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.router.navigate(['/calendar']);
                this.dialogRefRegister.close();
            },
            error => {
                localStorage.removeItem("currentUser");
                this.error = true;
            }
        );
    }
}
