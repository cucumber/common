using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class StepsContainer
    {
        public StepsContainer()
        {
            Steps = new List<Step>();
            Examples = new List<Examples>();
        }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "steps")]
        public IReadOnlyCollection<Step> Steps { get; set; }

        [DataMember(Name = "examples")]
        public IReadOnlyCollection<Examples> Examples { get; set; }
    }
}