using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanesGame.SignalR
{
    public class HitResult
    {
        public int X { get; set; }
        public int Y { get; set; }
        public bool Hit { get; set; }
        public bool Head { get; set; }
        public bool Win { get; set; }
    }
}