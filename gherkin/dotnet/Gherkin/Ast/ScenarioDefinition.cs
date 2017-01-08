using System.Collections.Generic;

namespace Gherkin.Ast
{
    public abstract class ScenarioDefinition : IHasLocation, IHasDescription, IHasSteps
    {
        public Location Location { get; private set; }
        public string Keyword { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public IEnumerable<Step> Steps { get; private set; }

        protected ScenarioDefinition(Location location, string keyword, string name, string description, Step[] steps)
        {
            Location = location;
            Keyword = keyword;
            Name = name;
            Description = description;
            Steps = steps;
        }
    }
}