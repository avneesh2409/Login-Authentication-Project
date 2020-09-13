using Microsoft.EntityFrameworkCore.Migrations;

namespace LoginAuthenticationProject.Migrations
{
    public partial class initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtpModelMsgId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_OtpModelMsgId",
                table: "Users",
                column: "OtpModelMsgId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Otps_OtpModelMsgId",
                table: "Users",
                column: "OtpModelMsgId",
                principalTable: "Otps",
                principalColumn: "MsgId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Otps_OtpModelMsgId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_OtpModelMsgId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OtpModelMsgId",
                table: "Users");
        }
    }
}
