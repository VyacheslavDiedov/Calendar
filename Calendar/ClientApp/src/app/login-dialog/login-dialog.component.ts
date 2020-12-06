import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

export class LoginData {
    constructor(
        public userLogin: string,
        public userPassword: string
    ) { }
}

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

    public userLoginInput: string = '';
    public userPasswordInput: string = '';

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    loginUser(): void {
        const userToLogin: LoginData = new LoginData(
            this.userLoginInput,
            this.userPasswordInput
        );

        console.log(userToLogin); // TODO Provide API call to login user

        this.dialogRef.close();
    }
}
