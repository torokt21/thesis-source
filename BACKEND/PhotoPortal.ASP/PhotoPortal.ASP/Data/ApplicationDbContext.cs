using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PhotoPortal.ASP.Models;
using System.Numerics;
using System.Reflection.Emit;

namespace PhotoPortal.ASP.Data
{
    /// <inheritdoc/>
    public class ApplicationDbContext : IdentityDbContext
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public DbSet<Child> Children { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PackageInformation> PackageInformations { get; set; }
        public DbSet<PackageOrder> PackageOrders { get; set; }
        public DbSet<PackageRequirement> PackageRequirements { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Photographer> Users { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ShippingMethod> ShippingMethods { get; set; }

#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

        /// <inheritdoc/>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }


        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Relationships

            // institution - photographer
            builder.Entity<Institution>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Institutions)
                .HasForeignKey(a => a.PhotographerId)
                .OnDelete(DeleteBehavior.SetNull);
            

            // institution - child
            builder.Entity<Child>()
                .HasOne(a => a.Institution)
                .WithMany(b => b.Children)
                .HasForeignKey(a => a.InstitutionId)
                .OnDelete(DeleteBehavior.Cascade); ;

            // picture - child
            builder.Entity<Picture>()
                .HasOne(a => a.Child)
                .WithMany(b => b.Pictures)
                .HasForeignKey(a => a.ChildId)
                .OnDelete(DeleteBehavior.Cascade); ;

            // order - photographer
            builder.Entity<Order>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Orders)
                .HasForeignKey(a => a.PhotographerId)
                .OnDelete(DeleteBehavior.SetNull); ;

            // order - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Order)
                .WithMany(b => b.Items)
                .HasForeignKey(a => a.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // product - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Product)
                .WithMany()
                .HasForeignKey(a => a.ProductId);

            // product - photographer
            builder.Entity<Product>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Products)
                .HasForeignKey(a => a.PhotographerId)
                .OnDelete(DeleteBehavior.SetNull);

            // package information - photographer
            builder.Entity<PackageInformation>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.PackageInformations)
                .HasForeignKey(a => a.PhotographerId)
                .OnDelete(DeleteBehavior.SetNull);

            // picture - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Picture)
                .WithMany()
                .HasForeignKey(a => a.PictureId)
                .OnDelete(DeleteBehavior.SetNull);


            // package requirement - package information
            builder.Entity<PackageRequirement>()
                .HasOne(a => a.PackageInformation)
                .WithMany(b => b.Requirements)
                .HasForeignKey(a => a.PackageInformationId)
                .OnDelete(DeleteBehavior.Cascade);

            // package requirement - product
            builder.Entity<PackageRequirement>()
                .HasOne(a => a.Product)
                .WithMany()
                .HasForeignKey(a => a.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // package order - package information
            builder.Entity<PackageOrder>()
                .HasOne(a => a.PackageInformation)
                .WithMany()
                .HasForeignKey(a => a.PackageInformationId)
                .OnDelete(DeleteBehavior.SetNull);

            // institution - products
            builder.Entity<Institution>()
                .HasMany(a => a.OrderableProducts)
                .WithMany(b => b.AvailableIn);

            // institution - package infos
            builder.Entity<Institution>()
                .HasMany(a => a.OrderablePackages)
                .WithMany(b => b.AvaliableIn);

            // institution - classes
            builder.Entity<Class>()
                .HasOne(a => a.Institution)
                .WithMany(b => b.Classes)
                .HasForeignKey(a => a.InstitutionId)
                .OnDelete(DeleteBehavior.Cascade);


            // shipping method - order
            builder.Entity<Order>()
                .HasOne(a => a.ShippingMethod)
                .WithMany()
                .HasForeignKey(a => a.ShippingMethodId)
                .OnDelete(DeleteBehavior.SetNull);

            // payment method - order
            builder.Entity<Order>()
                .HasOne(a => a.PaymentMethod)
                .WithMany()
                .HasForeignKey(a => a.PaymentMethodId)
                .OnDelete(DeleteBehavior.SetNull);

            IdentityRole adminRole = new()
            {
                Id = "9407ad10-0964-4010-ae9c-ee2f4b36bb35",
                ConcurrencyStamp = "da7a4f42-ff3c-42a8-935a-62af68f978b0",
                Name = "Admin",
                NormalizedName = "ADMIN"
            };

            IdentityRole HelperRole = new()
            {
                Id = "4cc0e13d-7c2e-4946-b2a9-f1b80af36743",
                ConcurrencyStamp = "8b3c8f46-de8d-4d9c-9f24-fb786da25e12",
                Name = "Helper",
                NormalizedName = "HELPER"
            };
            builder.Entity<IdentityRole>().HasData(adminRole);
            builder.Entity<IdentityRole>().HasData(HelperRole);

            PasswordHasher<Photographer> ph = new PasswordHasher<Photographer>();
            Photographer seed = new Photographer
            {
                Id = Guid.NewGuid().ToString(),
                Email = "torokt21@gmail.com",
                EmailConfirmed = true,
                UserName = "torokt21",
                DisplayName = "Az iskola fotósa",
                NormalizedUserName = "TOROKT21"
            };
            seed.PasswordHash = ph.HashPassword(seed, "Almafa123!!!");
            builder.Entity<Photographer>().HasData(seed);

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = adminRole.Id,
                UserId = seed.Id,
            });


            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = HelperRole.Id,
                UserId = seed.Id,
            });


            base.OnModelCreating(builder);
        }
    }
}