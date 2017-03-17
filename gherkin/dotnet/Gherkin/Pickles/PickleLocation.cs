namespace Gherkin.Pickles
{
    public class PickleLocation
    {
        public int Line { get; private set; }
        public int Column { get; private set; }

        public PickleLocation(int line, int column)
        {
            Line = line;
            Column = column;
        }
    }
}
