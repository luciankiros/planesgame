namespace PlanesGame.BL.Common
{
    public class Maths
    {
        public int Factorial(int n)
        {
            if (n <= 1)
            {
                return 1;
            }

            return n * Factorial(n - 1);
        }

        public int Fibonacci(int n)
        {
            if (n < 3)
            {
                return 1;
            }

            return Fibonacci(n - 1) + Fibonacci(n - 2);
        }
    }
}
