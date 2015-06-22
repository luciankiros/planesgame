using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace PlanesGame.SignalR
{
    [HubName("gameHub")]
    public class GameHub : Hub
    {
        public void CreateGame(string code, bool privateGame)
        {
            Host.NewGame(code, Context, privateGame);

            NotifyGameNumbers();
        }

        public void ConnectToGame(string code)
        {
            var hostConnectionID = Host.ConnectToGame(code, Context);

            Clients.Caller.onConnectToGame(!string.IsNullOrEmpty(hostConnectionID));
            Clients.Client(hostConnectionID).onOpponentConnected();

            NotifyGameNumbers();
        }

        public void IAmReady(string code, Board board)
        {
            var otherPlayerConnectionID = Host.PlayerReady(code, Context.ConnectionId, board);

            Clients.Client(otherPlayerConnectionID).onOpponentReady();
        }

        public void GameCanStart(string code)
        {
            var players = Host.GameCanStart(code);
            Clients.Clients(players).onStartGame();
        }

        public void Hit(string code, int x, int y)
        {
            HitResult hitResult;
            var players = Host.Hit(code, Context.ConnectionId, x, y, out hitResult);
            Clients.Clients(players).onHitResult(hitResult);
        }

        public void PlayAgain(string code, bool wants)
        {
            var player = Host.PlayAgain(code, Context.ConnectionId);
            if(!String.IsNullOrEmpty(player)) {
                Clients.Client(player).onOpponentPlayAgain(wants);
            }
        }

        public void GameCanStartAgain(string code)
        {
            var players = Host.GameCanStartAgain(code);
            Clients.Clients(players).onGameCanStartAgain();
        }

        public void SendMessage(string code, string message)
        {
            var opponent = Host.GetOpponent(code, Context.ConnectionId);

            if (String.IsNullOrEmpty(opponent))
            {
                return;
            }

            Clients.Client(opponent).onMessageReceived(message);
        }

        public void Draw(string code, Point p1, Point p2, string color, int lineWidth)
        {
            var opponent = Host.GetOpponent(code, Context.ConnectionId);

            if (String.IsNullOrEmpty(opponent))
            {
                return;
            }

            Clients.Client(opponent).onDraw(p1, p2, color, lineWidth);
        }

        public void ClearDraw(string code)
        {
            var opponent = Host.GetOpponent(code, Context.ConnectionId);

            if (String.IsNullOrEmpty(opponent))
            {
                return;
            }

            Clients.Client(opponent).onClearDraw();
        }


        public void ClientOnStartPage()
        {
            DisconnectPlayer();
        }


        private void DisconnectPlayer()
        {
            var opponent = Host.DisconnectPlayer(Context.ConnectionId);

            if (!String.IsNullOrEmpty(opponent))
            {
                Clients.Client(opponent).onOpponentDisconnected();
            }

            NotifyGameNumbers();
        }

        private void NotifyGameNumbers()
        {
            var publicGamesCount = Host.GetPublicGamesCount();

            Clients.All.onNotifyGameNumbers(publicGamesCount);
        }
    }
}
