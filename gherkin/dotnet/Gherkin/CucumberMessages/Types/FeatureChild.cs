using System.Runtime.Serialization;
using Gherkin.Events.Args.Ast;

namespace Gherkin.CucumberMessages.Types
{
    public class FeatureChild
    {
        [DataMember(Name = "scenario")]
        public StepsContainer Scenario { get; set; }

        [DataMember(Name = "background")]
        public StepsContainer Background { get; set; }

        [DataMember(Name = "rule")]
        public Rule Rule { get; set; }
    }
}