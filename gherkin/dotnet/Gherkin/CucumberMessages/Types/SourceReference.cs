using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class SourceReference
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        //TODO: javaMethod, javaStackTraceElement
    }
}