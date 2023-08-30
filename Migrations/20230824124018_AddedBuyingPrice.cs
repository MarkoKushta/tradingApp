using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedBuyingPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "buyingPrice",
                table: "StocksTable",
                type: "numeric",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "buyingPrice",
                table: "StocksTable");
        }
    }
}
