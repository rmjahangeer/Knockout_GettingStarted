using System.Web.Mvc;
using System.Web.Routing;

namespace KnockoutJSSample
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "KnockoutJSSample.Controllers" }
            );

            //routes.MapRoute(
            //    name: "Default-Shop",
            //    url: "{*url}",
            //    defaults: new { controller = "Home", action = "Index" }
            //).DataTokens = new RouteValueDictionary(new { area = "Shop" });
        }
    }
}
