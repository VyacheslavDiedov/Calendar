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
    DragAndDropService,
    EventSettingsModel
} from '@syncfusion/ej2-angular-schedule';
import { EventService } from "src/service/event-api.service";
import { EventData, EventDataManager } from "src/models/event-data";

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
        DragAndDropService,
        EventService
    ]
})
export class ScheduleComponent implements OnInit{
    event: EventData;
    events: Array<EventData>;
    eventSettings: EventSettingsModel;
    isLoadedData: boolean;
    currentUserId: number;
    dayInMilliseconds: number = 1000 * 60 * 60 * 24;

    constructor(private serv: EventService){
        this.isLoadedData = false;
        this.eventSettings = {
            dataSource: []
        };
        this.currentUserId = JSON.parse(localStorage.getItem("currentUser")).userID;
    };
    ngOnInit(): void {
        this.loadEvents();
        this.backgroundTask();
    };

    public loadEvents() {
        this.serv.getEvents(this.currentUserId).subscribe(
            (data: EventData[]) => {
                this.events = data;
                for(let i = 0; i < this.events.length; i++){
                    let events = new EventDataManager(this.events[i].eventId, this.events[i].eventName,
                        this.events[i].startEventDateTime, this.events[i].endEventDateTime, this.events[i].isAllDay,
                        this.events[i].eventDescription);
                    this.eventSettings.dataSource[i] = events;
                }
                 this.isLoadedData = true;
            }
        );
    }

    public onActionBegin(e): void {
        switch (e.requestType) {
            case 'eventCreate': {
                this.event = new EventData(
                    0,
                    e.addedRecords[0].Subject ,
                    e.addedRecords[0].StartTime,
                    e.addedRecords[0].EndTime,
                    e.addedRecords[0].IsAllDay,
                    null,
                    e.addedRecords[0].Description,
                    this.currentUserId
                );
                this.serv.createEvent(this.event).subscribe();
                this.backgroundTask();
                break;
            }
            case 'eventChange': {
                this.event = new EventData(
                    e.changedRecords[0].Id,
                    e.changedRecords[0].Subject,
                    e.changedRecords[0].StartTime,
                    e.changedRecords[0].EndTime,
                    e.changedRecords[0].IsAllDay,
                    null,
                    e.changedRecords[0].Description,
                    this.currentUserId
                );
                this.serv.updateEvent(this.event).subscribe();
                this.backgroundTask();
                break;
            }
            case 'eventRemove': {
                this.serv.deleteEvent(e.deletedRecords[0].Id).subscribe();
                this.backgroundTask();
                break;
            }
        }
    }

    public sentEmail(e) {
        this.serv.sentEmail(e).subscribe();
    }

    public checkEvent() {
        const minuteInMilliseconds: number = 60000;
    this.serv.getEvents(this.currentUserId).subscribe(
    (data: EventData[]) => {
        this.events = data.filter(startTime => new Date(startTime.startEventDateTime) > new Date()
                                && (+new Date(startTime.startEventDateTime) - +new Date()) <= this.dayInMilliseconds);
        this.events.sort((x, y) => +new Date(x.startEventDateTime) - +new Date(y.startEventDateTime));
            console.log(this.events);
            console.log(this.events.map( s => (+new Date(s.startEventDateTime) - +new Date())))
            for(let i = 0; i < this.events.length; i++){
                setTimeout(
                    () =>{
                            this.sentEmail(this.events[i]);
                    }, (+new Date(this.events[i].startEventDateTime) - +new Date())
                                - (minuteInMilliseconds * 15)
                )
            }

            });
    }

    public backgroundTask(){
        this.checkEvent();

        setInterval(() => {
            this.checkEvent()
        }, this.dayInMilliseconds);
    }
}
