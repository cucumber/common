using System.Collections.Generic;

namespace Gherkin.Pickles
{
    public class Pickle
    {
        public string Name { get; private set; }
        public string Language { get; private set; }
        public IEnumerable<PickleStep> Steps { get; private set; }
        public IEnumerable<PickleTag> Tags { get; private set; }
        public IEnumerable<PickleLocation> Locations { get; private set; }

        public Pickle(string name, string language, IEnumerable<PickleStep> steps, IEnumerable<PickleTag> tags, IEnumerable<PickleLocation> locations)
        {
            Name = name;
            Language = language;
            Steps = steps;
            Tags = tags;
            Locations = locations;
        }
    }
}
