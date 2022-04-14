using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class FeatureChild
    {
        [DataMember(Name = "scenario")]
        public Scenario Scenario { get; set; }

        [DataMember(Name = "background")]
        public Background Background { get; set; }

        [DataMember(Name = "rule")]
        public Rule Rule { get; set; }

        public FeatureChild()
        {
        }

        public FeatureChild(Scenario scenario, Background background, Rule rule)
        {
            Scenario = scenario;
            Background = background;
            Rule = rule;
        }
    }
}