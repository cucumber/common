using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class DocString
    {
        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "contentType")]
        public string ContentType { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }

    }
}