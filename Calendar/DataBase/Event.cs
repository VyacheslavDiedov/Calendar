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
        public DateTime EventDateTime { get; set; }
        public bool IsImportant { get; set; }
        public int EventCategoryId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
