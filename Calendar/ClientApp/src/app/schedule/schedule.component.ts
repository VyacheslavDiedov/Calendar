import { Component, OnInit } from '@angular/core';
import {
    AgendaService,
    DayService,
    MonthAgendaService,
    MonthService,
    TimelineMonthService,
    TimelineViewsService,
    WeekService,
    WorkWeekService,
    YearService,
    ActionEventArgs,
    EventSettingsModel
} from '@syncfusion/ej2-angular-schedule';
import {EventData, EventDataManager} from '../../models/event-data';
import {EventService} from '../../service/event-api.service';
import { DataManager, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import {basicUrl} from '../../service/basicUrl';


// class CustomAdaptor extends ODataV4Adaptor {
//     processResponse(): Object {
//         let i: number = 0;
//         // calling base class processResponse function
//         let original: Object[] = super.processResponse.apply(this, arguments);
//         // adding employee id
//         original.forEach((item: Object) => item['EventID'] = ++i);
//         debugger;
//         return  original;
//     }
// }

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    providers: [
        DayService,
        WeekService,
        WorkWeekService,
        MonthService,
        AgendaService,
        MonthAgendaService,
        TimelineViewsService,
        TimelineMonthService,
        YearService,
        EventService
    ]
})
export class ScheduleComponent implements OnInit{
    addEvent: EventData;
    events: Array<EventDataManager>;
    eventSettings: EventSettingsModel;
    myEvent: EventDataManager = new EventDataManager();
    isLoadedData: boolean;
    constructor(private serv: EventService){
        this.isLoadedData = false;
        this.eventSettings = {dataSource:[{
                Id: 1,
                Subject: this.myEvent.eventName,
                StartTime: new Date(2020, 12, 14, 9, 0),
                EndTime: new Date(2020, 12, 14, 10, 0),
                IsAllDay: false,
                RecurrenceRule: null,
                Description: 'My'
            }, {
                Id: 2,
                Subject: 'Vacation',
                StartTime: new Date(2020, 12, 15, 9, 0),
                EndTime: new Date(2020, 12, 15, 10, 0),
                IsAllDay: false,
                RecurrenceRule: null,
                Description: 'Not my'
            }]};
    };
    ngOnInit(): void {
        this.loadEvents();
    };

    // public selectedDate: Date = new Date(2020, 11, 15);
    // private dataManager: DataManager = new DataManager({
    //     url: basicUrl.apiUrl + '/api/events/' + 1,
    //     adaptor: new ODataV4Adaptor,
    //     crossDomain: true
    // });
    // public eventSettings: EventSettingsModel = { dataSource: this.dataManager };


    // public selectedDate: Date = new Date(2020, 11, 20);
    // private dataManager: DataManager = new DataManager({
    //     url: basicUrl.apiUrl + '/api/events/' + 1,
    //     adaptor: new CustomAdaptor
    // });
    // public eventSettings: EventSettingsModel = { dataSource: this.dataManager};


    public selectedDate: Date = new Date(2020, 11, 15);
    public loadEvents() {
        this.serv.getEvents(JSON.parse(localStorage.getItem("currentUser")).userID as number).subscribe(
            (data: EventDataManager) => {
                //this.eventSettings.dataSource = data;
                this.myEvent= data;
                this.isLoadedData = true;
                this.eventSettings.dataSource[0].Subject = "Fuck";
                this.eventSettings.dataSource[0].StartTime = this.myEvent.startEventDateTime;
                this.eventSettings.dataSource[0].EndTime = this.myEvent.endEventDateTime;
                console.log(this.eventSettings.dataSource);
                console.log(this.myEvent);
                // this.eventSettings.dataSource = data;
               //console.log(this.eventSettings.dataSource);
            }
        );
    }
    //public eventSettings: EventSettingsModel = { dataSource: this.events };
    // public eventSettings: EventSettingsModel = {
    //     dataSource:[{
    //         Id: 1,
    //         Subject: this.myEvent.eventName,
    //         StartTime: new Date(2020, 12, 14, 9, 0),
    //         EndTime: new Date(2020, 12, 14, 10, 0),
    //         IsAllDay: false,
    //         RecurrenceRule: null,
    //         Description: 'My'
    //     }, {
    //         Id: 2,
    //         Subject: 'Vacation',
    //         StartTime: new Date(2020, 12, 15, 9, 0),
    //         EndTime: new Date(2020, 12, 15, 10, 0),
    //         IsAllDay: false,
    //         RecurrenceRule: null,
    //         Description: 'Not my'
    //     }]
    //  }

    public onActionBegin(e): void {
        switch (e.requestType) {
            case 'eventCreate': {
                this.addEvent = new EventData(
                    0,
                    e.addedRecords[0].Subject ,
                    e.addedRecords[0].StartTime,
                    e.addedRecords[0].EndTime,
                    e.addedRecords[0].IsAllDay,
                    null,
                    e.addedRecords[0].Description,
                    JSON.parse(localStorage.getItem("currentUser")).userID
                );
                this.serv.createEvent(this.addEvent).subscribe();
                break;
            }
            case 'eventChange': {
                this.addEvent = new EventData(
                    e.changedRecords[0].Id,
                    e.changedRecords[0].Subject,
                    e.changedRecords[0].StartTime,
                    e.changedRecords[0].EndTime,
                    e.changedRecords[0].IsAllDay,
                    null,
                    e.changedRecords[0].Description,
                    JSON.parse(localStorage.getItem("currentUser")).userID
                );
                this.serv.updateEvent(this.addEvent).subscribe();
                break;
            }
            case 'eventRemove': {
                this.serv.deleteEvent(e.deletedRecords[0].Id).subscribe();
                break;
            }
        }
    }
}
