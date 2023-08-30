using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BankAccountNumber",
                table: "kycTable",
                newName: "CardNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CardNumber",
                table: "kycTable",
                newName: "BankAccountNumber");
        }
    }
}
