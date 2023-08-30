using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedBalance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "tradingAppUsers",
                type: "numeric",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "tradingAppUsers");
        }
    }
}
