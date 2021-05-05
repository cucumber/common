using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class DocString
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "mediaType")]
        public string MediaType { get; set; }

        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "delimiter")]
        public string Delimiter { get; set; }
    }
}