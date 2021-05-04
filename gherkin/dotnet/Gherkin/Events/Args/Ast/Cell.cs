using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Cell
    {
        [DataMember(Name = "location")]
        public CucumberMessages.Types.Location Location { get; set; }
        [DataMember(Name = "value")]
        public string Value { get; set; }
    }
}