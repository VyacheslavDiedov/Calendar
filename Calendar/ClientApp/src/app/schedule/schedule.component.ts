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
import { L10n } from '@syncfusion/ej2-base';
import { EventService } from 'src/service/event-api.service';
import { EventData, EventDataManager } from 'src/models/event-data';

L10n.load({
    'en-US': {
        schedule: {
            day: 'День',
            week: 'Тиждень',
            month: 'Місяць',
            year: 'Рік',
            agenda: 'Порядок денний',
            today: 'Сьогодні',
            noEvents: 'Немає подій',
            emptyContainer: 'Події на цей день не заплановані',
            allDay: 'Весь день',
            start: 'Початок',
            end: 'Кінець',
            more: 'Більше',
            close: 'Закрити',
            cancel: 'Відмінити',
            noTitle: '(Без назви)',
            delete: 'Видалити',
            deleteEvent: 'Видалити подію',
            deleteMultipleEvent: 'Видалити серію подій',
            selectedItems: 'Обрані елементи',
            deleteSeries: 'Видалити серію',
            edit: 'Змінити',
            editSeries: 'Змінити серію',
            editEvent: 'Змінити подію',
            createEvent: 'Створити',
            subject: 'Назва події',
            addTitle: 'Додати назву події',
            moreDetails: 'Додати деталі',
            save: 'Зберегти',
            editContent: 'Ви дійсно хочете змінити подію чи всю серію?',
            deleteRecurrenceContent: 'Ви дійсно хочете видалити подію чи всю серію?',
            deleteContent: 'Ви дійсно хочете видалити подію?',
            deleteMultipleContent: 'Ви дійсно хочете видалити ці події?',
            newEvent: 'Нова подія',
            title: 'Назва події',
            location: 'Місце',
            description: 'Опис події',
            timezone: 'Timezone',
            startTimezone: 'Start Timezone',
            endTimezone: 'End Timezone',
            repeat: 'Повторення',
            saveButton: 'Зберегти',
            cancelButton: 'Відмінити',
            deleteButton: 'Видалити',
            recurrence: 'Повторення',
            wrongPattern: 'The recurrence pattern is not valid.',
            seriesChangeAlert: 'The changes made to specific instances of this series will be cancelled and those events will match the series again.',
            createError: 'The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.',
            recurrenceDateValidation: 'Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.',
            sameDayAlert: 'Two occurrences of the same event cannot occur on the same day.',
            editRecurrence: 'Змінити повторення',
            repeats: 'Повторювати',
            alert: 'Увага',
            startEndError: 'Обраний час закінчення події спливає по початку події.',
            invalidDateError: 'Невірно обраний час події.',
            ok: 'Ok',
            occurrence: 'Occurrence',
            series: 'Серія',
            previous: 'Попередне',
            next: 'Наступне',
            timelineDay: 'Timeline Day',
            timelineWeek: 'Timeline Week',
            timelineWorkWeek: 'Timeline Work Week',
            timelineMonth: 'Timeline Month'
        },
        calendar: {
            today: 'Сьогодні'
        }
    }
});

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
    addEvent: EventData;
    events: Array<EventData>;
    eventSettings: EventSettingsModel;
    isLoadedData: boolean;

    constructor(private serv: EventService){
        this.isLoadedData = false;
        this.eventSettings = {
            dataSource: []
        };
    };
    ngOnInit(): void {
        this.loadEvents();
    };

    // public selectedDate: Date = new Date();
    public loadEvents() {
        this.serv.getEvents(JSON.parse(localStorage.getItem('currentUser')).userID as number).subscribe(
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
                    JSON.parse(localStorage.getItem('currentUser')).userID
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
                    JSON.parse(localStorage.getItem('currentUser')).userID
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
