using System.Web.Mvc;

namespace KnockoutJSSample.Areas.Shop.Controllers
{
    public class HomeController : Controller
    {
        // GET: Shop/Home
        public ActionResult Index()
        {
            ViewBag.Home = true;
            return View();
        }
    }
}