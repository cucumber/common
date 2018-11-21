using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Attachment
{
    public class Source
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }

    }
}