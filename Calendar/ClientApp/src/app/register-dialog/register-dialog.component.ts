import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {

    constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClick() {
        console.log(`On click`);
        this.dialogRef.close();
    }
}
