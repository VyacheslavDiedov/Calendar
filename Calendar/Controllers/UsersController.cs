using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calendar.ViewModels;
using Calendar.DataBase;

namespace Calendar.Controllers
{
    [Route("api/Calendar/Users")]
    [ApiController]
    [SwaggerTag("Users")]
    public class UsersController : ControllerBase
    {
        private readonly CalendarContext _context;

        public UsersController(CalendarContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of Users from DB
        /// </summary>
        /// <returns>response status "OK" and list of Users</returns>
        [HttpGet()]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        /// <summary>
        /// Get User by Id from DB
        /// </summary>
        /// <param name="id">User Id</param>
        /// <returns>response status "OK" and User or status "NotFound" and error message</returns>
        [HttpGet("User/{userId}")]
        public async Task<ActionResult> GetUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound($"Could not found user with Id={userId}");
            }

            return Ok(user);
        }

        /// <summary>
        /// Add new User to DB
        /// </summary>
        /// <param name="user">User to add</param>
        /// <returns>response status "Ok" and message</returns>
        [HttpPost("User")]
        public async Task<ActionResult> AddUser([FromBody] User user)
        {
            if (_context.Users.FirstOrDefault(us => us.UserEMail.Equals(user.UserEMail)) == null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }

            return BadRequest($"User with email {user.UserEMail} is exist");
        }

        /// <summary>
        /// Handle login data and returns user
        /// </summary>
        /// <param name="loginData">User login data</param>
        /// <returns>response status "Ok" and user or status "BadRequest" with error message</returns>
        [HttpPost("Login")]
        public IActionResult UserLogin([FromBody] LoginData loginData)
        {
            User user = _context.Users.
                Where(us => us.UserEMail.Equals(loginData.UserLogin)
                            && us.UserPassword.Equals(loginData.UserPassword))
                .FirstOrDefault();

            if (user != null)
            {
                return Ok(user);
            }

            return BadRequest("Can't find user with such login and password");
        }

        /// <summary>
        /// Change defined User in DB
        /// </summary>
        /// <param name="user">User to update</param>
        /// <returns>response status  "BadRequest" if  if User to change is null</returns>
        [HttpPut]
        public async Task<IActionResult> PutUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest($"Inputed User's data is null");
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok($"Inputed User's data is modified");
        }
    }
}
