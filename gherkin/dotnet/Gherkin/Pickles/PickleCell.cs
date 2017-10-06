namespace Gherkin.Pickles
{
    public class PickleCell
    {
        public PickleLocation Location { get; private set; }
        public string Value { get; private set; }

        public PickleCell(PickleLocation location, string value)
        {
            Location = location;
            Value = value;
        }
    }
}
