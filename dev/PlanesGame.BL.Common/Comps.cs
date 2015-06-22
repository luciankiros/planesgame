namespace PlanesGame.BL.Common
{
    public class Comps
    {
        public int Max(int a, int b)
        {
            var max = a > b ? a : b;
            return max;
        }

        public int Min(int a, int b)
        {
            var min = a < b ? a : (b < a ? b : a);
            return min;
        }
    }
}
