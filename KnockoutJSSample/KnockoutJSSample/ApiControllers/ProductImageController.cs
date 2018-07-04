using System.Threading.Tasks;
using System.Web.Http;
using Antlr.Runtime.Misc;
using Repository;

namespace KnockoutJSSample.ApiControllers
{
    [RoutePrefix("api/productImage")]
    public class ProductImageController : BaseApiController
    {
        private readonly TodoAppEntities _repository = new TodoAppEntities();

        public async Task<IHttpActionResult> Delete(int id)
        {
            var product = _repository.ProductImages.Remove(await _repository.ProductImages.FindAsync(id));
            await _repository.SaveChangesAsync();
            if (product != null)
                return Ok();
            return NotFound();


        }
    }
}