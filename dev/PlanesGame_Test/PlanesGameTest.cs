using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlanesGame.SignalR;
using System;

namespace PlanesGame_Test
{
    [TestClass]
    public class PlanesGameTest
    {
        [TestMethod]
        public void GameHub_UsingHubInstanceThrowsException()
        {

            var expected = new InvalidOperationException();
            Exception actual = null;
            try
            {
                new GameHub().CreateGame("", true);
            }
            catch (InvalidOperationException ioe)
            {
                actual = ioe;
            }
            Assert.AreEqual(expected.GetType(), actual.GetType());
        }

    }
}
