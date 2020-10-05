using Microsoft.EntityFrameworkCore.Migrations;

namespace LoginAuthenticationProject.Migrations
{
    public partial class paymwentadded1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "PaymentHistories",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "PaymentHistories");
        }
    }
}
