using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class TableCell
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        
        [DataMember(Name = "value")]
        public string Value { get; set; }
    }
}