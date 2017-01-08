namespace Gherkin.Ast
{
    public class Tag : IHasLocation
    {
        public Location Location { get; private set; }
        public string Name { get; private set; }

        public Tag(Location location, string name)
        {
            Name = name;
            Location = location;
        }
    }
}