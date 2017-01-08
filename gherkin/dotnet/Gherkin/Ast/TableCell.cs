namespace Gherkin.Ast
{
    public class TableCell : IHasLocation
    {
        public Location Location { get; private set; }
        public string Value { get; private set; }

        public TableCell(Location location, string value)
        {
            Location = location;
            Value = value;
        }
    }
}