import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestPageComponent } from './test-page/test-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent} from './header/header.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TestPageComponent,
        HeaderComponent,
        RegisterDialogComponent,
        LoginDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'test', component: TestPageComponent }
        ]),
        MatToolbarModule,
        MatIconModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
