using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExitPoll.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeRezervimi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ID_FushaPadel",
                table: "RezervimiFushes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ID_FushaPadel",
                table: "RezervimiFushes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
