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
    YearService
} from '@syncfusion/ej2-angular-schedule';

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
        YearService
    ]
})
export class ScheduleComponent {
}
