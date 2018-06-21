
using System;
using System.Collections.Generic;

namespace Models.DomainModels
{
    public class Product
    {
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    
        public virtual Category Category { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
    }
}
