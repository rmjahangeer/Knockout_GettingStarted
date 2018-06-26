using System.Threading.Tasks;
using System.Web.Http;
using Repository;

namespace KnockoutJSSample.Controllers
{
    [RoutePrefix("api/productImage")]
    public class ProductImageController : ApiController
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