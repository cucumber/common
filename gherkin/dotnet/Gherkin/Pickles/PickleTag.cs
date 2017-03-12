namespace Gherkin.Pickles
{
    public class PickleTag
    {
        public PickleLocation Location { get; private set; }
        public string Name { get; private set; }

        public PickleTag(PickleLocation location, string name)
        {
            Location = location;
            Name = name;
        }
    }
}
