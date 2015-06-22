using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanesGame.SignalR
{
    public class Host
    {
        private static IList<Game> Games { get; set; }
        private static Object _lockObject = new Object();

        static Host()
        {
            Games = new List<Game>();
        }

        public static string GetNewGameCode()
        {
            var gameCode = string.Empty;
            
            while (true)
            {
                gameCode = Guid.NewGuid().ToString().Substring(0, 8);
                if (!Games.Any(x => x.Code == gameCode))
                {
                    break;
                }
            }

            return gameCode;
        }

        public static void NewGame(string code, HubCallerContext context, bool privateGame)
        {
            var existingGame = true;

            var game = Games.SingleOrDefault(x => x.Code == code);
            if (game == null)
            {
                existingGame = false;
                game = new Game { Code = code, Private = privateGame };
            }

            game.Host = new Player { Context = context };

            if (!existingGame)
            {
                lock (_lockObject)
                {
                    Games.Add(game);
                }
            }
        }

        public static string ConnectToGame(string code, HubCallerContext context)
        {
            var game = Games.SingleOrDefault(x => x.Code == code);
            if (game == null)
            {
                return string.Empty;
            }

            if (game.Guest != null) // guest must be null because it is supposed that the opponent didn't connect yet
            { 
                return string.Empty; 
            }

            game.Guest = new Player { Context = context };

            return game.Host.Context.ConnectionId;
        }

        public static string PlayerReady(string code, string connectionID, Board board)
        {
            var game = Games.SingleOrDefault(x => x.Code == code);
            if (game == null)
            {
                return string.Empty;
            }

            if (game.Host.Context.ConnectionId == connectionID)
            {
                game.Host.Ready = true;
                game.Host.SetBoard(board);
                return game.Guest.Context.ConnectionId;
            }
            else
            {
                if (game.Guest.Context.ConnectionId == connectionID)
                {
                    game.Guest.Ready = true;
                    game.Guest.SetBoard(board);
                    return game.Host.Context.ConnectionId;
                }
            }

            return string.Empty;
        }

        public static IList<string> GameCanStart(string code)
        {
            var game = Games.SingleOrDefault(x => x.Code == code);
            if (game == null)
            {
                return new List<string>();
            }

            game.Started = true;
            game.HostTurn = true;

            var players = new List<String> { game.Host.Context.ConnectionId, game.Guest.Context.ConnectionId };
            return players;
        }

        public static IList<string> Hit(string code, string connectionID, int x, int y, out HitResult hitResult)
        {
            hitResult = new HitResult { X = x, Y = y };

            var game = Games.SingleOrDefault(t => t.Code == code);
            if (game == null)
            {
                return new List<string>();
            }

            if (!game.Started)
            {
                return new List<string>();
            }

            Player player = null;
            if (game.Host.Context.ConnectionId == connectionID)
            {
                player = game.Guest;
            }
            else
            {
                if (game.Guest.Context.ConnectionId == connectionID)
                {
                    player = game.Host;
                }
            }

            if (player == null)
            {
                return new List<String>();
            }

            CheckHit(player, x, y, ref hitResult);

            game.HostTurn = !game.HostTurn;

            var players = new List<String> { game.Host.Context.ConnectionId, game.Guest.Context.ConnectionId };
            return players;
        }

        private static void CheckHit(Player player, int x, int y, ref HitResult hitResult)
        {
            var headUnhit = false;
            foreach (var plane in player.Board.Planes)
            {
                foreach (var cell in plane.Cells)
                {
                    if (cell.X == x && cell.Y == y)
                    {
                        cell.Hit = true;
                        hitResult.Hit = true;
                        hitResult.Head = cell.Head;
                    }
                }
            }

            headUnhit = player.Board.Planes.SelectMany(t => t.Cells).Any(t => t.Head && !t.Hit);
            hitResult.Win = !headUnhit;
        }

        public static string PlayAgain(string code, string connectionID)
        {
            var game = Games.SingleOrDefault(t => t.Code == code);
            if (game == null)
            {
                return string.Empty;
            }

            Player player = null;
            if (game.Host.Context.ConnectionId == connectionID)
            {
                player = game.Guest;
            }
            else
            {
                if (game.Guest.Context.ConnectionId == connectionID)
                {
                    player = game.Host;
                }
            }

            if (player == null)
            {
                return string.Empty;
            }

            return player.Context.ConnectionId;
        }

        public static IList<string> GameCanStartAgain(string code)
        {
            var game = Games.SingleOrDefault(t => t.Code == code);
            if (game == null)
            {
                return new List<string>();
            }

            var players = new List<String> { game.Host.Context.ConnectionId, game.Guest.Context.ConnectionId };

            game.Guest = null;
            game.Started = false;

            return players;
        }

        public static string GetOpponent(string code, string connectionID)
        {
            var game = Games.SingleOrDefault(t => t.Code == code);
            if (game == null)
            {
                return string.Empty;
            }

            if (game.Host.Context.ConnectionId == connectionID)
            {
                return game.Guest.Context.ConnectionId;
            }
            else
            {
                if (game.Guest.Context.ConnectionId == connectionID)
                {
                    return game.Host.Context.ConnectionId;
                }
            }

            return string.Empty;
        }

        public static string GetOpponent(string connectionID)
        {
            foreach (var game in Games)
            {
                if (game.Host != null && game.Host.Context.ConnectionId == connectionID)
                {
                    return game.Guest.Context.ConnectionId;
                }
                else
                {
                    if (game.Guest != null && game.Guest.Context.ConnectionId == connectionID)
                    {
                        return game.Host.Context.ConnectionId;
                    }
                }
            }

            return string.Empty;
        }

        public static string DisconnectPlayer(string connectionID)
        {
            Game currentGame = null;
            string opponentConnectionID = null;
            foreach (var game in Games)
            {
                if (game.Host != null && game.Host.Context.ConnectionId == connectionID)
                {
                    currentGame = game;
                    if (game.Guest != null)
                    {
                        opponentConnectionID = game.Guest.Context.ConnectionId;
                    }
                }
                else
                {
                    if (game.Guest != null && game.Guest.Context.ConnectionId == connectionID)
                    {
                        currentGame = game;
                        if (game.Host != null)
                        {
                            opponentConnectionID = game.Host.Context.ConnectionId;
                        }
                    }
                }
            }

            if (currentGame != null)
            {
                Games.Remove(currentGame);
            }

            return opponentConnectionID;
        }

        public static int GetPublicGamesCount()
        {
            return Games.Count(x => !x.Private);
        }

        internal static string GetPublicGameCode()
        {
            var publicGame = Games.FirstOrDefault(x => !x.Private);

            if (publicGame != null)
            {
                publicGame.Private = true;
                return publicGame.Code;
            }

            return String.Empty;
        }
    }
}