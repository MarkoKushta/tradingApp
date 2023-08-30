using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable132 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kycTable_tradingAppUsers_UserId1",
                table: "kycTable");

            migrationBuilder.DropIndex(
                name: "IX_kycTable_UserId1",
                table: "kycTable");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "kycTable");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "kycTable",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_kycTable_UserId1",
                table: "kycTable",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_kycTable_tradingAppUsers_UserId1",
                table: "kycTable",
                column: "UserId1",
                principalTable: "tradingAppUsers",
                principalColumn: "Id");
        }
    }
}
