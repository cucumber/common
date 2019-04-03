using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class Cell
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "value")]
        public string Value { get; set; }
    }
}