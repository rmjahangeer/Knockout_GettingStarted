namespace KnockoutJSSample.Models
{
    
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public CategoryModel Category { get; set; }
    
    }
}
