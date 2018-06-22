using System;
using Models.Common;
using Models.Common.Enumerations;

namespace Models.RequestModels
{
    /// <summary>
    /// Product Search Request Model
    /// </summary>
    public class ProductSearchRequest : GetPagedListRequest
    {
        public int? ProductId { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Name { get; set; }
        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }

        public ProductOrderBy OrderBy
        {
            get { return (ProductOrderBy)SortBy; }
            set { SortBy = (short) value; }
        }
    }
}
