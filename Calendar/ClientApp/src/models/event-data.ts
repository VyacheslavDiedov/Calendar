
export class EventData {
    constructor(
        public eventId: number,
        public EventName: string,
        public StartEventDateTime: Date,
        public EndEventDateTime: Date,
        public IsAllDay: boolean,
        public RecurrenceRule: string,
        public EventDescription: string,
        public UserID: number
    ){}
}

export class EventDataManager {
    constructor(
        public Id: number = 0,
        public eventName: string = '',
        public startEventDateTime: Date = null,
        public endEventDateTime: Date = null,
        public IsAllDay: boolean = false,
        public Description: string = '',
    ){}
}
