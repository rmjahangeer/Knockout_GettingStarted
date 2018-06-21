namespace Models.DomainModels
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public int ProductId { get; set; }
    
        public virtual Product Product { get; set; }
    }
}
