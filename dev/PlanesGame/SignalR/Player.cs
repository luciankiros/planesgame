using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlanesGame.SignalR
{
    public class Player
    {
        public HubCallerContext Context { get; set; }
        public bool Ready { get; set; }
        public Board Board { get; set; }

        public void SetBoard(Board board)
        {
            foreach (var plane in board.Planes)
            {
                foreach (var cell in plane.Cells)
                {
                    cell.Plane = plane;
                }
            }

            Board = board;
        }
    }

    public class Board
    {
        public IList<Plane> Planes { get; set; }
    }

    public class Plane
    {
        public IList<Cell> Cells { get; set; }
    }

    public class Cell
    {
        public int X { get; set; }
        public int Y { get; set; }
        public bool Head { get; set; }
        public bool Hit { get; set; }

        public Plane Plane { get; set; }
    }
}