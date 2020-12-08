import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent} from './header/header.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CalendarComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', redirectTo: '/home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'calendar', component: CalendarComponent}
        ]),
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
