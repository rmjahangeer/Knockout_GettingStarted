using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(KnockoutJSSample.Startup))]

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
