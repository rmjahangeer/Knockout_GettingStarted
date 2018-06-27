using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KnockoutJSSample.Controllers
{
    public class PageNotFoundController : Controller
    {
        // GET: PageNotFound
        public ActionResult Index()
        {
            Response.StatusCode = 404;
            Response.TrySkipIisCustomErrors = true;
            return View();
        }

        public ActionResult Error()
        {
            Response.StatusCode = 503;
            Response.TrySkipIisCustomErrors = true;
            return View();
        }
    }
}