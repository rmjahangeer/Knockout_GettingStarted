using KnockoutJSSample.Models;
using Repository;

namespace KnockoutJSSample.Mappers
{
    public static class Mappers
    {
        public static Product Map(this ProductModel source)
        {
            return new Product
            {
                Id = source.Id,
                Name = source.Name,
                CategoryId = source.CategoryId
            };
        }

        public static ProductModel Map(this Product source)
        {
            return new ProductModel
            {
                Id = source.Id,
                Name = source.Name,
                Category = source.Category?.Map(),
                CategoryId = source.CategoryId,
                CategoryName = source.Category?.Name
            };
        }

        public static Category Map(this CategoryModel source)
        {
            return new Category
            {
                Id = source.Id,
                Name = source.Name
            };
        }

        public static CategoryModel Map(this Category source)
        {
            return new CategoryModel
            {
                Id = source.Id,
                Name = source.Name
            };
        }
    }
}