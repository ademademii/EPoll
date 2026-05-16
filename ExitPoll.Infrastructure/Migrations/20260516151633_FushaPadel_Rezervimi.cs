using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExitPoll.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FushaPadel_Rezervimi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FushaPadels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriFushes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vendodhja = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FushaPadels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RezervimiFushes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriRezervuesit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrPersonave = table.Column<int>(type: "int", nullable: false),
                    ID_FushaPadel = table.Column<int>(type: "int", nullable: false),
                    FushaPadelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RezervimiFushes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RezervimiFushes_FushaPadels_FushaPadelId",
                        column: x => x.FushaPadelId,
                        principalTable: "FushaPadels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RezervimiFushes_FushaPadelId",
                table: "RezervimiFushes",
                column: "FushaPadelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RezervimiFushes");

            migrationBuilder.DropTable(
                name: "FushaPadels");
        }
    }
}
