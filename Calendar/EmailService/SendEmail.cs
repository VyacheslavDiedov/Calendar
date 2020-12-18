using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Calendar.DataBase;

namespace Calendar.EmailService
{
    public class SendEmail
    {
        public async Task SendEmailAsync(string email, string subject, Event myEvent)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Calendar", "my_forum_register@ukr.net"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            var description = myEvent.EventDescription == null ? $"<p>{myEvent.EventDescription}</p>" : null;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = $"<div>" +
                       $"<p>Сьогодні о {myEvent.StartEventDateTime.TimeOfDay} у вас заплановано {myEvent.EventName}</p>" +
                 description +
                $"<p>Гарного дня!</p>" +
                       "</div>"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.ukr.net", 465, true);
                await client.AuthenticateAsync("my_forum_register@ukr.net", "f9nvhpPRcvaQZkE1");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
