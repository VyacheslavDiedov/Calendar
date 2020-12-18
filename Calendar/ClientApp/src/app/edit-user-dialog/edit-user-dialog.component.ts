import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CalendarApiService} from "../../service/calendar-api.service";
import {UserData} from "../../models/user-data";
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit{

    public userFirstNameInput: string = '';
    public userLastNameInput: string = '';
    public userEMailInput: string = '';
    public userPhoneInput: string = '';
    public passwordInput: string = '';
    public userID: number = 0;
    public currentUser: any = null;
    public error: boolean = false;

    constructor(public dialogRefRegister: MatDialogRef<EditUserDialogComponent>,
                public APIService: CalendarApiService,
                private router: Router) {}

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.userFirstNameInput = this.currentUser.userFirstName;
        this.userLastNameInput = this.currentUser.userLastName;
        this.userEMailInput = this.currentUser.userEMail;
        this.userPhoneInput = this.currentUser.userPhone;

    }

    onNoClick(): void {
        this.dialogRefRegister.close();
    }

    editUser(): void {
        let userToEdit: UserData = new UserData(
            this.userFirstNameInput,
            this.userLastNameInput,
            this.userEMailInput,
            this.userPhoneInput,
            this.passwordInput = this.currentUser.userPassword,
            this.userID = this.currentUser.userID
        );

        this.APIService.EditUser(userToEdit).subscribe();
        this.dialogRefRegister.close();
        localStorage.setItem("currentUser", JSON.stringify(userToEdit));
    }
}
