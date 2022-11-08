using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Source
    {
        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        [DataMember(Name = "data")]
        public string Data { get; set; }

        [DataMember(Name = "mediaType")]
        public string MediaType { get; set; }
    }
}