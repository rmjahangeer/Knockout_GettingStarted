using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(KnockoutJSSample.Startup))]
[assembly: log4net.Config.XmlConfigurator(Watch = true)]

namespace KnockoutJSSample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
