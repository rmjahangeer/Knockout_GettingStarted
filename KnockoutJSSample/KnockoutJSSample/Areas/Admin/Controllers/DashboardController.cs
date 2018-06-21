using System.Web.Mvc;

namespace KnockoutJSSample.Areas.Admin.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Products()
        {
            ViewBag.Title = "Product Page";

            return View();
        }

        public ActionResult AddProduct(int? id)
        {
            ViewBag.Title = "Product Page";
            ViewBag.id = id;

            return View();
        }

        public ActionResult Category()
        {
            ViewBag.Title = "Category List Page";

            return View();
        }

        public ActionResult AddCategory(int? id)
        {
            ViewBag.Title = "Category Create/Edit Page";
            ViewBag.id = id;

            return View();
        }
    }
}
