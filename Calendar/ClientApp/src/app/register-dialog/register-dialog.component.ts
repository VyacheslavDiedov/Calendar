import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CalendarApiService} from "../../service/calendar-api.service";
import {UserData} from "../../models/user-data";
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

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

    constructor(public dialogRefRegister: MatDialogRef<RegisterDialogComponent>,
              //  public dialogRefLogin: MatDialogRef<LoginDialogComponent>,
                public APIService: CalendarApiService) {}

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

        console.log(userToRegister); // TODO Provide API call to register user
        this.APIService.AddUser(userToRegister).subscribe();
        this.dialogRefRegister.close();
    }
}
