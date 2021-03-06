﻿using System.Linq;
using Models.DomainModels;
using Models.WebModels;

namespace Models.Mappers
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
                ModifiedOn = source.CreatedOn,
                ProductImages = source.ProductImages.Select(x=>x.Map()).ToList()
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
                ModifiedOn = source.CreatedOn,
                ProductImages = source.ProductImages.Select(x => x.Map()).ToList()
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
                Image = source.Image,
                ParentCategory = source.MainCategory?.Name
            };
        }
        public static CategoryModel MapWithChildren(this Category source)
        {
            return new CategoryModel
            {
                Id = source.Id,
                Name = source.Name,
                ParentId = source.ParentId,
                Image = source.Image,
                Children = source.ChildCategories?.ToList().Select(x=>x.Map()).ToList(),
                ParentCategory = source.MainCategory?.Name
            };
        }

        public static ProductImageModel Map(this ProductImage source)
        {
            return new ProductImageModel
            {
                Id = source.Id,
                Image = source.Image,
                ProductId = source.ProductId
            };
        }

        public static ProductImage Map(this ProductImageModel source)
        {
            return new ProductImage
            {
                Id = source.Id,
                Image = source.Image,
                ProductId = source.ProductId
            };
        }

        public static PurchaseHistoryModel Map(this PurchaseHistory source)
        {
            return new PurchaseHistoryModel
            {
                Id = source.Id,
                ProductId = source.ProductId,
                CreatedOn = source.CreatedOn,
                Quantity = source.Quantity,
                UserId = source.UserId
                
            };
        }

        public static PurchaseHistory Map(this PurchaseHistoryModel source)
        {
            return new PurchaseHistory
            {
                Id = source.Id,
                ProductId = source.ProductId,
                CreatedOn = source.CreatedOn,
                Quantity = source.Quantity,
                UserId = source.UserId
            };
        }
    }
}