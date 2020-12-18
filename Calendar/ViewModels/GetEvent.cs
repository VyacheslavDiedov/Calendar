using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calendar.ViewModels
{
    public class GetEvent
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public string Description { get; set; }
    }
}
