namespace PlanesGame.SignalR
{
    public class Game
    {
        public string Code { get; set; }
        public Player Host { get; set; }
        public Player Guest { get; set; }
        public bool Started { get; set; }
        public bool HostTurn { get; set; }
        public bool Private { get; set; }
    }
}