using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KYCStatus",
                table: "kycTable");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "kycTable",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "kycTable");

            migrationBuilder.AddColumn<string>(
                name: "KYCStatus",
                table: "kycTable",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
