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
    events: Array<EventData>;
    eventSettings: EventSettingsModel;
    isLoadedData: boolean;
    eventDataManager: EventDataManager

    constructor(private serv: EventService){
        this.isLoadedData = false;
        this.eventSettings = {
            dataSource: []
        };
    };
    ngOnInit(): void {
        this.loadEvents();
    };

    public selectedDate: Date = new Date();
    public loadEvents() {
        this.serv.getEvents(JSON.parse(localStorage.getItem("currentUser")).userID as number).subscribe(
            (data: EventData[]) => {
                this.events = data;
                //this.myEvent= data;
                for(let i = 0; i < this.events.length; i++){
                    let events = new EventDataManager(this.events[i].eventId, this.events[i].eventName,
                        this.events[i].startEventDateTime, this.events[i].endEventDateTime, this.events[i].isAllDay,
                        this.events[i].eventDescription);
                    this.eventSettings.dataSource[i] = events;
                }
                //console.log(events)

                 this.isLoadedData = true;

               //  console.log(this.eventSettings.dataSource);
               //  // this.eventSettings.dataSource = data;
               // //console.log(this.eventSettings.dataSource);
               //  this.eventSettings = {
               //      dataSource: data,
               //      fields: {
               //          id: 'Id',
               //          subject: { name: 'EventName' },
               //          isAllDay: { name: 'IsAllDay' },
               //          startTime: { name: 'StartTime' },
               //          endTime: { name: 'EndTime' },
               //      }
               //  }
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
        console.log(e)
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
