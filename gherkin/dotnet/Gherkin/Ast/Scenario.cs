using System.Collections.Generic;

namespace Gherkin.Ast
{
    public class Scenario : ScenarioDefinition, IHasTags
    {
        public IEnumerable<Tag> Tags { get; private set; }

        public Scenario(Tag[] tags, Location location, string keyword, string name, string description, Step[] steps) 
            : base(location, keyword, name, description, steps)
        {
            Tags = tags;
        }
    }
}