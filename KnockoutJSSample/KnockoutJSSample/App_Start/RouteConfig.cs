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
            routes.MapRoute("redirect all other requests", "{*url}",
                new
                {
                    controller = "Home",
                    action = "Index"
                }).DataTokens = new RouteValueDictionary(new { area = "Shop" });

            /*routes.MapRoute(
                name: "Area",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "KnockoutJSSample.Areas.Shop.Controllers" }
            ).DataTokens = new RouteValueDictionary(new {area = "Shop"});*/
        }
    }
}
