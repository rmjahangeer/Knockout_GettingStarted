using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models.Common.Enumerations;
using Models.DomainModels;
using Models.Mappers;
using Models.RequestModels;
using Models.ResponseModels;

namespace Repository.Repositories
{
    public class ProductRepository
    {
        private readonly TodoAppEntities _db = new TodoAppEntities();
        private readonly Dictionary<ProductOrderBy, Func<Product, object>> _orderClause =
            new Dictionary<ProductOrderBy, Func<Product, object>>
            {
                {ProductOrderBy.Name, o => o.Name },
                {ProductOrderBy.Category, o => o.Category.Name }
            };


        public async Task<SearchResponse<Product>> Search(ProductSearchRequest searchRequest)
        {
            int fromRow = (searchRequest.PageNo - 1) * searchRequest.PageSize;
            int toRow = searchRequest.PageSize;
            Expression<Func<Product, bool>> query =
                s =>
                    (searchRequest.ProductId == null || searchRequest.ProductId.Value.Equals(s.Id)) &&
                    (searchRequest.CategoryId == null || searchRequest.CategoryId.Value.Equals(s.CategoryId)) &&
                    (!searchRequest.PriceFrom.HasValue || s.Price >= searchRequest.PriceFrom) &&
                    (!searchRequest.PriceTo.HasValue || s.Price <= searchRequest.PriceTo) &&
                    (searchRequest.Name == null || s.Name.ToLower().Contains(searchRequest.Name.ToLower()) || s.Category.Name.ToLower().Contains(searchRequest.Name.ToLower()));

            IEnumerable<Product> data = searchRequest.IsAsc
                ? _db.Products
                    .Where(query)
                    .OrderBy(_orderClause[searchRequest.OrderBy])
                    .Skip(fromRow)
                    .Take(toRow)
                    .ToList()
                : _db.Products
                    .Where(query)
                    .OrderByDescending(_orderClause[searchRequest.OrderBy])
                    .Skip(fromRow)
                    .Take(toRow)
                    .ToList();

            return new SearchResponse<Product>
            {
                data = data,
                recordsTotal = await _db.Products.CountAsync(),
                recordsFiltered = await _db.Products.CountAsync(query)
            };
        }

        public Task<List<Product>> GetAll()
        {
            return _db.Products.ToListAsync();
        }

        public Task<Product> Find(int id)
        {
            return _db.Products.FindAsync(id);
        }

        public Task<List<Product>> FindByCategory(int catId)
        {
            return _db.Products.Where(x => x.CategoryId == catId).ToListAsync();
        }

        public async Task<Product> SaveOrUpdate(Product model)
        {
            // add case
            if (model.Id == 0)
            {
                _db.Products.Add(model);
            }
            else
            {
                // update case
                var product = await _db.Products.FindAsync(model.Id);
                if (product != null)
                {
                    product.CategoryId = model.CategoryId;
                    product.Name = model.Name;
                    product.Price = model.Price;
                    product.Description = model.Description;
                    product.Image = model.Image;
                    product.ModifiedBy = model.ModifiedBy;
                    product.ModifiedOn = DateTime.UtcNow;
                    product.ProductImages = model.ProductImages;
                    _db.Products.AddOrUpdate(product);
                }
            }
            await _db.SaveChangesAsync();
            return model;
        }

        public async Task<bool> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product != null)
            {
                _db.Products.Remove(product);
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
