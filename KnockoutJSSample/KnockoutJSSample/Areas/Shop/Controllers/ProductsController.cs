using System.Web.Mvc;

namespace KnockoutJSSample.Areas.Shop.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Shop/Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult View(int id)
        {
            ViewBag.productId = id;
            return View();
        }

        public ActionResult Catalog(string q, int? catId, int? productId)
        {
            //ViewBag.SearchTerms = new
            //{
            //    q,
            //    catId,
            //    productId
            //};
            return View();
        }
    }
}