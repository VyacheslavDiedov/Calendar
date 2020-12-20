using Calendar.DataBase;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MimeKit;
using Swashbuckle.AspNetCore.SwaggerUI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calendar
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("CalendarDBConnection");
            services.AddDbContext<CalendarContext>(options => options.UseSqlServer(connection));

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Calendar", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            UpdateDatabase(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Calendar API V1");
                c.DocExpansion(DocExpansion.None);
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            // E-mail event sender service
            Scheduler(app);
        }

        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<CalendarContext>())
                {
                    context.Database.Migrate();
                }
            }
        }

        #region E-mail event sender service

        private static async void Scheduler(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<CalendarContext>())
                {
                    while (true)
                    {
                        DateTime currentDay = DateTime.Now;

                        List<User> users = await context.Users.ToListAsync();
                        List<Event> events = await context.Events.Where(e => e.StartEventDateTime.Year == currentDay.Year
                                                                                && e.StartEventDateTime.Month == currentDay.Month
                                                                                && e.StartEventDateTime.Day == currentDay.Day
                                                                                && e.StartEventDateTime.Hour >= currentDay.Hour)
                                                                 .ToListAsync();

                        if (users != null && users.Any() && events != null && events.Any())
                        {
                            EventHandler(users, events);
                        }

                        await Task.Delay(60000);
                    }
                }
            }
        }

        private static async void EventHandler(List<User> users, List<Event> events)
        {
            DateTime currentDateTime = DateTime.Now.AddMinutes(10);

            if (events != null && events.Any())
            {
                foreach (var userEvent in events)
                {
                    if (userEvent.StartEventDateTime.Hour == currentDateTime.Hour 
                        && userEvent.StartEventDateTime.Minute == currentDateTime.Minute)
                    {
                        User user = users.Where(u => u.UserID == userEvent.UserID).FirstOrDefault();

                        if (user != null)
                        {
                            await MailSender(user, userEvent);
                        }
                    }
                }
            }
        }

        private static async Task MailSender(User user, Event userEvent)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Calendar", "my_forum_register@ukr.net"));
            emailMessage.To.Add(new MailboxAddress("", user.UserEMail));
            var description = userEvent.EventDescription != null ? $"<p>{userEvent.EventDescription}</p>" : null;
            emailMessage.Subject = userEvent.EventName;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = $"<div>" +
                            $"<p>Сьогодні о {userEvent.StartEventDateTime.TimeOfDay} у вас заплановано {userEvent.EventName}</p>" +
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

        #endregion
    }
}
