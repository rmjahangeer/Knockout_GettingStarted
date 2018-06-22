using System.Web.Mvc;
using System.Web.Routing;

namespace KnockoutJSSample
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            /*var route = routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new {controller = "Dashboard", action = "Index", id = UrlParameter.Optional}
            );
            route.DataTokens = new RouteValueDictionary(new { area = "Shop" });*/
            routes.MapRoute(
                name: "Default",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" }
            ).DataTokens = new RouteValueDictionary(new { area = "Shop" });
        }
    }
}
