using System.Collections.Generic;

namespace Gherkin.Ast
{
    public class ScenarioOutline : ScenarioDefinition, IHasTags
    {
        public IEnumerable<Tag> Tags { get; private set; }
        public IEnumerable<Examples> Examples { get; private set; }

        public ScenarioOutline(Tag[] tags, Location location, string keyword, string name, string description, Step[] steps, Examples[] examples) 
            : base(location, keyword, name, description, steps)
        {
            Tags = tags;
            Examples = examples;
        }
    }
}