using System.Runtime.Serialization;

namespace Gherkin.Events.Args
{
    public class SourceEventArgs
    {
        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        [DataMember(Name = "data")]
        public string Data { get; set; }

        [DataMember(Name = "mediaType")]
        public string MediaType { get; set; }
    }
}