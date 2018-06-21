using System;
using System.Collections.Generic;

namespace Models.DomainModels
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Image { get; set; }
    
        public virtual ICollection<Category> ChildCategories { get; set; }
        public virtual Category MainCategory { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
