using System.Collections.Generic;

namespace Gherkin.Ast
{
    public class Rule : IHasLocation, IHasDescription, IHasChildren
    {
        public Location Location { get; private set; }
        public string Keyword { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public IEnumerable<IHasLocation> Children { get; private set; }

        public Rule(Location location, string keyword, string name, string description, IHasLocation[] children)
        {
            Location = location;
            Keyword = keyword;
            Name = name;
            Description = description;
            Children = children;
        }
    }
}
