using System.Collections.Generic;
using System.Linq;

namespace PlanesGame.BL.Game
{
    public class PlayersHost
    {
        private List<int> _players;

        public PlayersHost()
        {
            _players = new List<int>();
        }

        public bool AddPlayer(int id)
        {
            if (_players.Contains(id))
            {
                return false;
            }

            _players.Add(id);
            return true;
        }

        public bool RemovePlayer(int id)
        {
            bool removed = _players.Remove(id);
            if (removed)
            {
                return true;
            }
            else
            {
                return false;
            }

            return false;
        }

        public int GetPlayersCount()
        {
            return _players.Count();
        }
    }
}
