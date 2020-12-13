
export class EventData {
    constructor(
        public Id: number,
        public Subject: string,
        public StartTime: Date,
        public EndTime: Date,
        public IsAllDay: boolean,
        public RecurrenceRule: string
    ){}
}
