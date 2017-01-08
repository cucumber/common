using System;

namespace Gherkin.Ast
{
    [Serializable]
    public class Location
    {
        public int Line { get; private set; }
        public int Column { get; private set; }

        public Location(int line = 0, int column = 0)
        {
            Line = line;
            Column = column;
        }
    }
}