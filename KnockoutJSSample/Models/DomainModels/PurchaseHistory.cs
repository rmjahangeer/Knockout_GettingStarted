using System;

namespace Models.DomainModels
{
    public class PurchaseHistory
    {
    
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public virtual Product Product { get; set; }
    }
}
