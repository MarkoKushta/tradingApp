using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedFKStockId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TransactionsTable_StockId",
                table: "TransactionsTable",
                column: "StockId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionsTable_StocksTable_StockId",
                table: "TransactionsTable",
                column: "StockId",
                principalTable: "StocksTable",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionsTable_StocksTable_StockId",
                table: "TransactionsTable");

            migrationBuilder.DropIndex(
                name: "IX_TransactionsTable_StockId",
                table: "TransactionsTable");
        }
    }
}
