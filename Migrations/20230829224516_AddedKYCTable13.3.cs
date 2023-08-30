using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable133 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable");

            migrationBuilder.CreateIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable");

            migrationBuilder.CreateIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable",
                column: "UserId",
                unique: true);
        }
    }
}
