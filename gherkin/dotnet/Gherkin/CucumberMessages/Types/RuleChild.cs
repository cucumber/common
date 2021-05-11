using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class RuleChild
    {
        [DataMember(Name = "background")]
        public Background Background { get; set; }

        [DataMember(Name = "scenario")]
        public Scenario Scenario { get; set; }

        public RuleChild()
        {
        }

        public RuleChild(Background background, Scenario scenario)
        {
            Background = background;
            Scenario = scenario;
        }
    }
}