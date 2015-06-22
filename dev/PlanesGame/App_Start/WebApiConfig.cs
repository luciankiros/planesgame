using System.Web.Http;

namespace PlanesGame
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "PublicGamesCount",
                routeTemplate: "api/game/PublicGamesCount/{id}",
                defaults: new { id = RouteParameter.Optional, controller = "Game", action = "GetPublicGamesCount" }
            );

            config.Routes.MapHttpRoute(
                name: "PublicGameCode",
                routeTemplate: "api/game/PublicGameCode/{id}",
                defaults: new { id = RouteParameter.Optional, controller = "Game", action = "GetPublicGameCode" }
            );

            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }
    }
}
