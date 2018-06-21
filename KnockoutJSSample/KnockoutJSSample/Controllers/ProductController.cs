using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using KnockoutJSSample.Mappers;
using KnockoutJSSample.Models;
using Microsoft.AspNet.Identity;
using Repository;

namespace KnockoutJSSample.Controllers
{
    public class ProductController : ApiController
    {
        private readonly TodoAppEntities _db = new TodoAppEntities();
        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            var response = await _db.Products.ToListAsync();
            var list = response.Select(x => x.Map()).ToList();
            return Ok(list);
        }

        // GET api/<controller>/5
        public async Task<IHttpActionResult> Get(int id)
        {

            var response = await _db.Products.FirstOrDefaultAsync(x => x.Id == id);
            var product = response?.Map();
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post([FromBody]ProductModel model)
        {
            model.CreatedOn = DateTime.UtcNow;
            model.CreatedBy = User.Identity.IsAuthenticated ? User.Identity.GetUserId() : "";
            _db.Products.Add(model.Map());
            await _db.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<controller>/5
        public async Task<IHttpActionResult> Put(int id, [FromBody]ProductModel model)
        {
            var product = await _db.Products.FindAsync(id);
            if (product != null)
            {
                product.CategoryId = model.CategoryId;
                product.Name = model.Name;
                product.Price = model.Price;
                product.Description = model.Description;
                product.Image = model.Image;
                product.ModifiedBy = User.Identity.IsAuthenticated ? User.Identity.GetUserId() : "";
                product.ModifiedOn = DateTime.UtcNow;
                _db.Products.AddOrUpdate(product);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        // DELETE api/<controller>/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product != null)
            {
                _db.Products.Remove(product);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}