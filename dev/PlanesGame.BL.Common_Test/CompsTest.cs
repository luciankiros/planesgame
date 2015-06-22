using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PlanesGame.BL.Common.NUnitTests
{
    [TestClass]
    public class CompsTest
    {
        [TestMethod]
        public void Max_2_3_Is_3()
        {
            var comps = new Comps();

            Assert.AreEqual(comps.Max(2, 3), 3);
            Assert.AreEqual(comps.Max(3, 2), 3);
        }

        [TestMethod]
        public void Min_2_3_Is_2()
        {
            var comps = new Comps();

            Assert.AreEqual(comps.Min(2, 3), 2);
        }
    }
}
