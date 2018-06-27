using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Models.Mappers;
using Models.WebModels;
using Repository;

namespace KnockoutJSSample.ApiControllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        private readonly TodoAppEntities _db = new TodoAppEntities();
        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            var response = await _db.Categories.ToListAsync();
            var list = response.Select(x => x.Map()).ToList();
            return Ok(list);
        }

        [Route("Main"), HttpGet]
        public async Task<IHttpActionResult> MainCategories()
        {
            var response = await _db.Categories.Where(x => x.ParentId == null).ToListAsync();
            var list = response.Select(x => x.MapWithChildren()).ToList();
            return Ok(list);
        }

        // GET api/<controller>/5
        public async Task<IHttpActionResult> Get(int id)
        {

            var response = await _db.Categories.FirstOrDefaultAsync(x => x.Id == id);
            var category = response?.Map();
            if (category == null)
                return NotFound();
            return Ok(category);
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post([FromBody]CategoryModel model)
        {
            _db.Categories.Add(model.Map());
            await _db.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<controller>/5
        public async Task<IHttpActionResult> Put(int id, [FromBody]CategoryModel model)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category != null)
            {
                category.Name = model.Name;
                _db.Categories.AddOrUpdate(category);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        // DELETE api/<controller>/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category != null)
            {
                _db.Categories.Remove(category);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}