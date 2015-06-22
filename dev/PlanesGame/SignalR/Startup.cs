using Microsoft.Owin;
using Owin;

[assembly:OwinStartup(typeof(PlanesGame.SignalR.Startup))]
namespace PlanesGame.SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}