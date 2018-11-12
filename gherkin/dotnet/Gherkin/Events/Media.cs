using System.Runtime.Serialization;

namespace Gherkin.Events
{
    public class Media
    {
        [DataMember(Name = "encoding")]
        public string Encoding { get; } = "utf-8";

        [DataMember(Name = "type")]
        public string Type { get; } = "text/x.cucumber.gherkin+plain";
    }
}