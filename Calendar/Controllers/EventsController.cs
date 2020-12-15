using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calendar.DataBase;
using Calendar.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Calendar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : Controller
    {
        private readonly CalendarContext _context;

        public EventsController(CalendarContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of Events from DB
        /// </summary>
        /// <returns>response status "OK" and list of Events</returns>
        [HttpGet("{userID:int}")]
        public async Task<ActionResult<List<GetEvent>>> GetEvents(int userID)
        {
            var allEvents = await _context.Events.Where(e => e.UserID == userID).ToListAsync();
            if (allEvents != null)
            {
                var events = new List<GetEvent>();
                foreach (var myEvent in allEvents)
                {
                    var eventModel = new GetEvent()
                    {
                        Id = myEvent.EventId,
                        Subject = myEvent.EventName,
                        StartTime = myEvent.StartEventDateTime,
                        EndTime = myEvent.EndEventDateTime,
                        Description = myEvent.EventDescription,
                        IsAllDay = myEvent.IsAllDay,

                    };
                    events.Add(eventModel);
                }
                return Ok(events);
            }

            return NotFound("Events didn't found");
        }

        ///// <summary>
        ///// Get Event by Id from DB
        ///// </summary>
        ///// <param name="id">Event Id</param>
        ///// <returns>response status "OK" and Event or status "NotFound" and error message</returns>
        //[HttpGet("{id:int}")]
        //public async Task<ActionResult> GetEvent(int id)
        //{
        //    var myEvent = await _context.Events.FindAsync(id);

        //    if (myEvent == null)
        //    {
        //        return NotFound($"Could not found Event with Id={id}");
        //    }

        //    return Ok(myEvent);
        //}

        /// <summary>
        /// Change defined by Id Event in DB
        /// </summary>
        /// <param name="myEvent">Event to update</param>
        /// <returns>response status "NoContent" or status "BadRequest" if no Event Id to change in DB
        ///     and if Event to change is null</returns>
        [HttpPut]
        public async Task<IActionResult> PutEvent([FromBody] Event myEvent)
        {
            if (myEvent == null)
            {
                return BadRequest($"Inputed Topic's data is null");
            }

            _context.Entry(myEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(myEvent);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(myEvent.EventId))
                {
                    return NotFound($"Could not found Topic with id={myEvent.EventId}");
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Add new Event to DB
        /// </summary>
        /// <param name="myEvent">Event to add</param>
        /// <returns>response status "Ok"</returns>
        [HttpPost]
        public async Task<ActionResult> PostEvent([FromBody] Event myEvent)
        {
            var newEvent = new Event();
            newEvent.EventId = myEvent.EventId;
            newEvent.EventName = myEvent.EventName;
            newEvent.StartEventDateTime = Convert.ToDateTime(myEvent.StartEventDateTime);
            newEvent.EndEventDateTime = Convert.ToDateTime(myEvent.EndEventDateTime);
            newEvent.EventDescription = myEvent.EventDescription;
            newEvent.IsAllDay = myEvent.IsAllDay;
            newEvent.Repeat = myEvent.Repeat;
            newEvent.UserID = myEvent.UserID;

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync(); 
            return Ok();
        }

        /// <summary>
        /// Delete Event by Id from DB
        /// </summary>
        /// <param name="id">Event Id to delete</param>
        /// <returns>response status "Ok" and message or status "NotFound" and message</returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var topic = await _context.Events.FindAsync(id);
            if (topic == null)
            {
                return NotFound($"Could not found Topic with Id={id}");
            }

            _context.Events.Remove(topic);
            await _context.SaveChangesAsync();

            return Ok();
        }


        /// <summary>
        /// Returns true if Event with Id exists id DB
        /// </summary>
        /// <param name="id">Event Id</param>
        /// <returns>"true" if Event with input Id exists in DB or "false" if not</returns>
        [HttpGet("{id:int}")]
        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.EventId == id);
        }

    }
}
