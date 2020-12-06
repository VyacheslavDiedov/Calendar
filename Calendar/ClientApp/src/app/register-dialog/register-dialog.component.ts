import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserData} from '../home/home.component';

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

    constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
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

        this.dialogRef.close();
    }
}
