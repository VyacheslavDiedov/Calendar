
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
