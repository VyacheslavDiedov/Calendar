using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Calendar.Migrations
{
    public partial class MigrateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Events",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "IsImportant",
                table: "Events",
                newName: "Repeat");

            migrationBuilder.RenameColumn(
                name: "EventDateTime",
                table: "Events",
                newName: "StartEventDateTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndEventDateTime",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsAllDay",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndEventDateTime",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "IsAllDay",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Events",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "StartEventDateTime",
                table: "Events",
                newName: "EventDateTime");

            migrationBuilder.RenameColumn(
                name: "Repeat",
                table: "Events",
                newName: "IsImportant");
        }
    }
}
