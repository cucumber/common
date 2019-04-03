using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Children
    {
        [DataMember(Name = "background")]
        public StepsContainer Background { get; set; }
        [DataMember(Name = "scenario")]
        public StepsContainer Scenario { get; set; }

        [DataMember(Name = "rule")]
        public Rule Rule { get; set; }

        
    }
}