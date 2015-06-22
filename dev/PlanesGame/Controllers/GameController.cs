using System.Web.Http;
using PlanesGame.SignalR;

namespace PlanesGame.Controllers
{
    public class GameController : ApiController
    {
        public int GetPublicGamesCount()
        {
            return Host.GetPublicGamesCount();
        }

        public string GetPublicGameCode()
        {
            return Host.GetPublicGameCode();
        }

        public dynamic PostStartGame()
        {
            return new { gameCode = Host.GetNewGameCode() };
        }
    }
}
