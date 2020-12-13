import { Component } from '@angular/core';
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
    ActionEventArgs
} from '@syncfusion/ej2-angular-schedule';
import {EventData} from '../../models/event-data';
import {EventService} from '../../service/event-api.service';

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
export class ScheduleComponent{
    addEvent: EventData;
    constructor(private serv: EventService){};

    public onActionBegin(args: ActionEventArgs): void {
        switch (args.requestType) {
            case 'eventCreate': {
                this.addEvent = new EventData(
                    0,
                    args.addedRecords[0].Subject,
                    args.addedRecords[0].StartTime,
                    args.addedRecords[0].EndTime,
                    args.addedRecords[0].IsAllDay,
                    null,
                    args.addedRecords[0].Description,
                    JSON.parse(localStorage.getItem("currentUser")).userID
                );
                this.serv.createEvent(this.addEvent).subscribe();
                break;
            }
            case 'eventChange': {
                this.addEvent = new EventData(
                    args.changedRecords[0].Id,
                    args.changedRecords[0].Subject,
                    args.changedRecords[0].StartTime,
                    args.changedRecords[0].EndTime,
                    args.changedRecords[0].IsAllDay,
                    null,
                    args.changedRecords[0].Description,
                    JSON.parse(localStorage.getItem("currentUser")).userID
                );
                this.serv.updateEvent(this.addEvent).subscribe();
                break;
            }
            case 'eventRemove': {
                this.serv.deleteEvent(args.deletedRecords[0].Id).subscribe();
                break;
            }
        }
    }
}
