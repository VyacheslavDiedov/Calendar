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
export class ScheduleComponent {
    addEvent: EventData;
    constructor(private serv: EventService){};

    public onActionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'eventCreate') {
            console.log(args.addedRecords);
            // @ts-ignore
            this.addEvent = new EventData(
                args.addedRecords[0].Id,
                args.addedRecords[0].Subject,
                args.addedRecords[0].StartTime,
                args.addedRecords[0].EndTime,
                args.addedRecords[0].IsAllDay,
                null);
        }
        this.serv.createEvent(this.addEvent).subscribe();
    }
}
