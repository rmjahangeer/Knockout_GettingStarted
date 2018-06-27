using System.Web.Mvc;

namespace KnockoutJSSample.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home", new { area = "Shop" });
        }
    }
}