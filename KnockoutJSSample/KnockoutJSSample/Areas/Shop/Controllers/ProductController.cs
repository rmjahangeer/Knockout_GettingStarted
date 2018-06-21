using System.Web.Mvc;

namespace KnockoutJSSample.Areas.Shop.Controllers
{
    public class ProductController : Controller
    {
        // GET: Shop/Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult View(int id)
        {
            return View();
        }
    }
}