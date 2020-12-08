import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {basicUrl} from './basicUrl';
import {UserData} from '../models/user-data';

@Injectable({
    providedIn: 'root'
})
export class CalendarApiService {

    constructor(private http: HttpClient) { }

    public GetUsers(): Observable<Array<UserData>> {
        // API URL
        const url: string = '/api/Calendar/Users';

        // call to API
        let resultArray: Array<UserData> = new Array<UserData>();
        return this.http.get<Array<UserData>>(basicUrl.apiUrl + url, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        resultArray = response.body;
                        return resultArray;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }

    public AddUser(userToAdd: UserData): Observable<UserData> {
        // get API URL
        const url: string = '/api/Calendar/Users/User';

        // call to API
        let result: any = null;
        return this.http.post(basicUrl.apiUrl + url, userToAdd, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        result = response.body;
                        return result;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }
}
