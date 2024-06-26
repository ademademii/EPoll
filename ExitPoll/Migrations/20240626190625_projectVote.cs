using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExitPoll.Migrations
{
    /// <inheritdoc />
    public partial class projectVote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Votes");
        }
    }
}
