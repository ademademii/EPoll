using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExitPoll.Migrations
{
    /// <inheritdoc />
    public partial class addPollingPlaceVote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PollingPlaceId",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Votes_PollingPlaceId",
                table: "Votes",
                column: "PollingPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_PollingPlaces_PollingPlaceId",
                table: "Votes",
                column: "PollingPlaceId",
                principalTable: "PollingPlaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_PollingPlaces_PollingPlaceId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_PollingPlaceId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "PollingPlaceId",
                table: "Votes");
        }
    }
}
