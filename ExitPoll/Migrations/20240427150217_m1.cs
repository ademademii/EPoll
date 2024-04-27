using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExitPoll.Migrations
{
    /// <inheritdoc />
    public partial class m1 : Migration
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

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ProjectId",
                table: "Votes",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_Projects_ProjectId",
                table: "Votes",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_Projects_ProjectId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_ProjectId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Votes");
        }
    }
}
