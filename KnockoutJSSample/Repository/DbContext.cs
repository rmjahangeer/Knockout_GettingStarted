using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Models.DomainModels;

namespace Repository
{


    public partial class TodoAppEntities : DbContext
    {
        public TodoAppEntities()
            : base("name=MyEntities")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<PurchaseHistory> PurchaseHistories { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<Product> Products { get; set; }
    }
}
