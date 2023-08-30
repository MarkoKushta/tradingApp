using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tradingAppCS.Migrations
{
    /// <inheritdoc />
    public partial class AddedKYCTable12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kycTable_tradingAppUsers_Id",
                table: "kycTable");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "kycTable",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "kycTable",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_kycTable_tradingAppUsers_UserId",
                table: "kycTable",
                column: "UserId",
                principalTable: "tradingAppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kycTable_tradingAppUsers_UserId",
                table: "kycTable");

            migrationBuilder.DropIndex(
                name: "IX_kycTable_UserId",
                table: "kycTable");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "kycTable");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "kycTable",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_kycTable_tradingAppUsers_Id",
                table: "kycTable",
                column: "Id",
                principalTable: "tradingAppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
