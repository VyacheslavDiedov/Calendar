using System;
using System.ComponentModel.DataAnnotations;

namespace Calendar.DataBase
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        [Required]
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        [Required]
        public DateTime StartEventDateTime { get; set; }
        public DateTime EndEventDateTime { get; set; }
        public bool IsAllDay { get; set; }
        public int EventCategoryId { get; set; }
        public bool Repeat { get; set; }
        [Required]
        public int UserID { get; set; }
        public bool IsNotification { get; set; }
    }
}
