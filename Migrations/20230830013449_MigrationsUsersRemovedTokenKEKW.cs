using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class MigrationsUsersRemovedTokenKEKW : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "tradingAppUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "tradingAppUsers",
                type: "text",
                nullable: true);
        }
    }
}
