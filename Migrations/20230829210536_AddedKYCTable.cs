using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KYCTableId",
                table: "tradingAppUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "kycTable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    KYCStatus = table.Column<string>(type: "text", nullable: false),
                    KYCDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    BankAccountNumber = table.Column<string>(type: "text", nullable: false),
                    CardHolderName = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<string>(type: "text", nullable: false),
                    CVV = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kycTable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_kycTable_tradingAppUsers_Id",
                        column: x => x.Id,
                        principalTable: "tradingAppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "kycTable");

            migrationBuilder.DropColumn(
                name: "KYCTableId",
                table: "tradingAppUsers");
        }
    }
}
