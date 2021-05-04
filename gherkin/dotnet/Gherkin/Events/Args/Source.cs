using System.Runtime.Serialization;

namespace Gherkin.Events.Args
{
    public class Source
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }

    }
}