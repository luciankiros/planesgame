using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlanesGame.BL.Game;

namespace PlanesGame.BL.Game_Test
{
    [TestClass]
    public class GameTest
    {
        [TestMethod]
        public void AtFirstThereAreNoPlayers()
        {
            var game = new PlayersHost();

            var playersCount = game.GetPlayersCount();

            Assert.IsTrue(playersCount == 0, "Created new game, but players count is not 0");
        }

        [TestMethod]
        public void Adding1PlayerIncrementsTheNumberOfPlayersByOne()
        {
            var game = new PlayersHost();

            var playersCount = game.GetPlayersCount();

            game.AddPlayer(1);

            var newPlayersCount = game.GetPlayersCount();

            Assert.IsTrue(newPlayersCount == playersCount + 1, "Added one player but the number of players did not increment");
        }

        [TestMethod]
        public void RemovingOneExistingPlayerDecrementsTheNumberOfPlayersByOne()
        {
            var game = new PlayersHost();

            game.AddPlayer(1);
            game.AddPlayer(2);
            game.AddPlayer(3);

            var playersCount = game.GetPlayersCount();

            game.RemovePlayer(2);

            var newPlayersCount = game.GetPlayersCount();

            Assert.IsTrue(newPlayersCount == playersCount - 1, "Removed one existing player, but the number of players did not decrement");
        }

        [TestMethod]
        public void RemovingNonExistingPlayerShouldKeepTheNumberOfPlayers()
        {
            var game = new PlayersHost();

            game.AddPlayer(1);
            game.AddPlayer(2);
            game.AddPlayer(3);

            var playersCount = game.GetPlayersCount();

            game.RemovePlayer(4);

            var newPlayersCount = game.GetPlayersCount();

            Assert.IsTrue(newPlayersCount == playersCount, "Removed non existing player, but the number of players changed");
        }

        [TestMethod]
        public void AddingExistingPlayerShouldFail()
        {
            var game = new PlayersHost();

            game.AddPlayer(1);
            game.AddPlayer(2);
            game.AddPlayer(3);

            var playersCount = game.GetPlayersCount();

            var addedExistingPlayer = game.AddPlayer(2);

            var newPlayersCount = game.GetPlayersCount();

            Assert.IsFalse(addedExistingPlayer, "Adding existing player fails");
            Assert.IsTrue(newPlayersCount == playersCount, "Adding Existing player does not change the players count");
        }
    }
}
