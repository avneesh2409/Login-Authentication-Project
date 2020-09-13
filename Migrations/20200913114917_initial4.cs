using Microsoft.EntityFrameworkCore.Migrations;

namespace LoginAuthenticationProject.Migrations
{
    public partial class initial4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtpModelMsgId",
                table: "Users",
                type: "text",
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
    }
}
