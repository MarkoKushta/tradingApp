using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedTransactionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountBought",
                table: "StocksTable");

            migrationBuilder.DropColumn(
                name: "sellingPrice",
                table: "StocksTable");

            migrationBuilder.RenameColumn(
                name: "AmountSold",
                table: "StocksTable",
                newName: "Quantity");

            migrationBuilder.CreateTable(
                name: "TransactionsTable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StockName = table.Column<string>(type: "text", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionsTable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionsTable_tradingAppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "tradingAppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionsTable_UserId",
                table: "TransactionsTable",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TransactionsTable");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "StocksTable",
                newName: "AmountSold");

            migrationBuilder.AddColumn<int>(
                name: "AmountBought",
                table: "StocksTable",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "sellingPrice",
                table: "StocksTable",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
