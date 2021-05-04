using System.Runtime.Serialization;
using Gherkin.Events.Args;

namespace Gherkin.CucumberMessages.Types
{
    public class ParseError
    {
        [DataMember(Name = "source")]
        public Source Source { get; set; }

        [DataMember(Name = "message")]
        public string Message { get; set; }
    }
}