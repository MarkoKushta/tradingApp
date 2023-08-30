using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class Update3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StocksTable_tradingAppUsers_userId",
                table: "StocksTable");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "StocksTable",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StocksTable_userId",
                table: "StocksTable",
                newName: "IX_StocksTable_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StocksTable_tradingAppUsers_UserId",
                table: "StocksTable",
                column: "UserId",
                principalTable: "tradingAppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StocksTable_tradingAppUsers_UserId",
                table: "StocksTable");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "StocksTable",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_StocksTable_UserId",
                table: "StocksTable",
                newName: "IX_StocksTable_userId");

            migrationBuilder.AddForeignKey(
                name: "FK_StocksTable_tradingAppUsers_userId",
                table: "StocksTable",
                column: "userId",
                principalTable: "tradingAppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
