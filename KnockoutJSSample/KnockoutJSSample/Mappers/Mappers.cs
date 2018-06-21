using KnockoutJSSample.Models;
using Models.DomainModels;
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
                CategoryId = source.CategoryId,
                CreatedOn = source.CreatedOn,
                Price = source.Price,
                CreatedBy = source.CreatedBy,
                Description = source.Description,
                Image = source.Image,
                ModifiedBy = source.ModifiedBy,
                ModifiedOn = source.CreatedOn
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
                CategoryName = source.Category?.Name,
                Price = source.Price,
                CreatedOn = source.CreatedOn,
                CreatedBy = source.CreatedBy,
                Description = source.Description,
                Image = source.Image,
                ModifiedBy = source.ModifiedBy,
                ModifiedOn = source.CreatedOn
            };
        }

        public static Category Map(this CategoryModel source)
        {
            return new Category
            {
                Id = source.Id,
                Name = source.Name,
                ParentId = source.ParentId,
                Image = source.Image
            };
        }

        public static CategoryModel Map(this Category source)
        {
            return new CategoryModel
            {
                Id = source.Id,
                Name = source.Name,
                ParentId = source.ParentId,
                Image = source.Image

            };
        }
    }
}