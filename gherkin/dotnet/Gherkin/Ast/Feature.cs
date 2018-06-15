using System.Collections.Generic;

namespace Gherkin.Ast
{
    public class Feature : IHasLocation, IHasDescription, IHasTags
    {
        public IEnumerable<Tag> Tags { get; private set; }
        public Location Location { get; private set; }
        public string Language { get; private set; }
        public string Keyword { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public IEnumerable<StepsContainer> Children { get; private set; }

        public Feature(Tag[] tags, Location location, string language, string keyword, string name, string description, StepsContainer[] children)
        {
            Tags = tags;
            Location = location;
            Language = language;
            Keyword = keyword;
            Name = name;
            Description = description;
            Children = children;
        }
    }
}
