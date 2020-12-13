import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {basicUrl} from './basicUrl';
import {EventData} from '../models/event-data';

@Injectable()
export class EventService {

    private url = '/api/events';

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:typedef
     getEvents() {
         return this.http.get(basicUrl.apiUrl + this.url);
     }

    // tslint:disable-next-line:typedef
    createEvent(event: EventData) {
         const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
         return this.http.post(basicUrl.apiUrl + this.url, JSON.stringify(event), {headers: myHeaders});
     }
    // tslint:disable-next-line:typedef
    updateEvent(event: EventData) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(basicUrl.apiUrl + this.url, JSON.stringify(event), {headers: myHeaders});
    }
    // tslint:disable-next-line:typedef
    deleteEvent(id: number) {
        return this.http.delete(basicUrl.apiUrl + this.url + '/' + id);
    }
}
