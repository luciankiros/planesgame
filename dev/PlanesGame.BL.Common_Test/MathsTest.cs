using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PlanesGame.BL.Common.NUnitTests
{
    [TestClass]
    public class MathsTest
    {
        [TestMethod]
        public void Factorial1Gives1()
        {
            var fact1 = new Maths().Factorial(1);

            Assert.AreEqual(1, fact1, "Factorial 1 does not return 1!");
        }

        //[TestMethod]
        //public void Factorial10Gives3628800()
        //{
        //    var fact10 = new Maths().Factorial(10);

        //    Assert.AreEqual(3628800, fact10, "Factorial 10 does not return 3628800!");
        //}

        [TestMethod]
        public void Fibonacci1Gives1()
        {
            var fib1 = new Maths().Fibonacci(1);

            Assert.AreEqual(1, fib1, "Fibonacci 1 does not return 1!");
        }

        [TestMethod]
        public void Fibonacci2Gives1()
        {
            var fib2 = new Maths().Fibonacci(2);

            Assert.AreEqual(1, fib2, "Fibonacci 2 does not return 1!");
        }

        //[TestMethod]
        //public void Fibonacci3Gives2()
        //{
        //    var fib3 = new Maths().Fibonacci(3);

        //    Assert.AreEqual(2, fib3, "Fibonacci 3 does not return 2!");
        //}

        //[TestMethod]
        //public void Fibonacci10Gives55()
        //{
        //    var fib10 = new Maths().Fibonacci(10);

        //    Assert.AreEqual(55, fib10, "Fibonacci 10 does not return 55!");
        //}
    }
}
