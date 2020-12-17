using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calendar.DataBase;
using Calendar.EmailService;
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
            var events = await _context.Events.Where(e => e.UserID == userID).ToListAsync();
            if (events != null)
            {
                return Ok(events);
            };
            return NotFound("Events didn't found");
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
            newEvent.StartEventDateTime = Convert.ToDateTime(myEvent.StartEventDateTime).ToLocalTime();
            newEvent.EndEventDateTime = Convert.ToDateTime(myEvent.EndEventDateTime).ToLocalTime();
            newEvent.EventDescription = myEvent.EventDescription;
            newEvent.IsAllDay = myEvent.IsAllDay;
            newEvent.Repeat = myEvent.Repeat;
            newEvent.UserID = myEvent.UserID;

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            return Ok();
        }

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
            var putEvent = new Event();
            putEvent.EventId = myEvent.EventId;
            putEvent.EventName = myEvent.EventName;
            putEvent.StartEventDateTime = Convert.ToDateTime(myEvent.StartEventDateTime).ToLocalTime();
            putEvent.EndEventDateTime = Convert.ToDateTime(myEvent.EndEventDateTime).ToLocalTime();
            putEvent.EventDescription = myEvent.EventDescription;
            putEvent.IsAllDay = myEvent.IsAllDay;
            putEvent.Repeat = myEvent.Repeat;
            putEvent.UserID = myEvent.UserID;
            _context.Entry(putEvent).State = EntityState.Modified;

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
        /// Delete Event by Id from DB
        /// </summary>
        /// <param name="id">Event Id to delete</param>
        /// <returns>response status "Ok" and message or status "NotFound" and message</returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var myEvent = await _context.Events.FindAsync(id);
            if (myEvent == null)
            {
                return NotFound($"Could not found Topic with Id={id}");
            }

            _context.Events.Remove(myEvent);
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

        [HttpPost("Event")]
        public async Task<ActionResult> SentNotification([FromBody] Event myEvent)
        {
            var userEmail = _context.Users.FirstOrDefault(u => u.UserID == myEvent.UserID)?.UserEMail;
            if (userEmail != null)
            {
                var emailService = new SendEmail();
                await emailService.SendEmailAsync(userEmail, myEvent.EventName, myEvent.EventDescription);
                return Ok();
            }
            return NotFound();

        }

    }
}
