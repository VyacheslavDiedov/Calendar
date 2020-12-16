
export class EventData {
    constructor(
        public eventId: number,
        public eventName: string,
        public startEventDateTime: Date,
        public endEventDateTime: Date,
        public isAllDay: boolean,
        public recurrenceRule: string,
        public eventDescription: string,
        public userID: number
    ){}
}

export class EventDataManager {
    constructor(
        public Id: number,
        public Subject: string,
        public StartTime: Date,
        public EndTime: Date,
        public IsAllDay: boolean,
        public Description: string
    ){}
}
