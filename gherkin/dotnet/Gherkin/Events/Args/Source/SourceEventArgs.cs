using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Source
{
    public class SourceEventArgs
    {
        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        [DataMember(Name = "data")]
        public string Data { get; set; }

        [DataMember(Name = "media")]
        public Media Media { get; set; }
    }
}