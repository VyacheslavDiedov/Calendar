import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

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
