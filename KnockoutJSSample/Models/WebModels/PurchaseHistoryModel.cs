using System;

namespace Models.WebModels
{
    public class PurchaseHistoryModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
