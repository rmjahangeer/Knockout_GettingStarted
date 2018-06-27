using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models.Mappers;
using Models.WebModels;
using Repository;

namespace KnockoutJSSample.ApiControllers
{
    [RoutePrefix("api/PurchaseHistory")]
    public class PurchaseHistoryController : ApiController
    {
        private readonly TodoAppEntities _db = new TodoAppEntities();
        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            var response = await _db.PurchaseHistories.ToListAsync();
            var list = response.Select(x => x.Map()).ToList();
            return Ok(list);
        }

        [Route("user")]
        public async Task<IHttpActionResult> GetUserPurchaseHistory()
        {
            var response = await _db.PurchaseHistories.Where(x => x.UserId == User.Identity.GetUserId()).ToListAsync();
            var list = response.Select(x => x.Map()).ToList();
            return Ok(list);
        }

        // GET api/<controller>/5
        public async Task<IHttpActionResult> Get(int id)
        {
            var response = await _db.PurchaseHistories.FindAsync(id);
            var category = response?.Map();
            if (category == null)
                return NotFound();
            return Ok(category);
        }

        // POST api/<controller>
        [Route("{userId}")]
        public async Task<IHttpActionResult> Post(string userId, [FromBody]List<PurchaseHistoryModel> model)
        {
            var createdOn = DateTime.UtcNow;
            //var userId = User.Identity.GetUserId();
            model.ForEach(x =>
            {
                x.CreatedOn = createdOn;
                x.UserId = userId;
            });
            _db.PurchaseHistories.AddRange(model.Select(x=>x.Map()));
            await _db.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/<controller>/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var category = await _db.PurchaseHistories.FindAsync(id);
            if (category != null)
            {
                _db.PurchaseHistories.Remove(category);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }
}