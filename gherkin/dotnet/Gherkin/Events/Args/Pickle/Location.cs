using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class Location
    {
        [DataMember(Name = "column")]
        public int Column { get; set; }
        [DataMember(Name = "line")]
        public int Line { get; set; }
    }
}