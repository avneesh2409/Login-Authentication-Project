﻿// <auto-generated />
using System;
using LoginAuthenticationProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoginAuthenticationProject.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200926124108_paymwentadded")]
    partial class paymwentadded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("LoginAuthenticationProject.Models.OtpModel", b =>
                {
                    b.Property<string>("MsgId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Otp")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("MsgId");

                    b.ToTable("Otps");
                });

            modelBuilder.Entity("LoginAuthenticationProject.Models.PayUMoneyDb", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<double>("Amount")
                        .HasColumnType("double precision");

                    b.Property<string>("EmailId")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("ProductInfo")
                        .HasColumnType("text");

                    b.Property<string>("TransactionId")
                        .HasColumnType("text");

                    b.Property<string>("Udf5")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("PaymentHistories");
                });

            modelBuilder.Entity("LoginAuthenticationProject.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Contact")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("MsgId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MsgId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LoginAuthenticationProject.Models.UserModel", b =>
                {
                    b.HasOne("LoginAuthenticationProject.Models.OtpModel", "Otps")
                        .WithMany()
                        .HasForeignKey("MsgId");
                });
#pragma warning restore 612, 618
        }
    }
}
