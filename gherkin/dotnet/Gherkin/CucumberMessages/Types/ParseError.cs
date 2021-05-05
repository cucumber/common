using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class ParseError
    {
        [DataMember(Name = "source")]
        public SourceReference Source { get; set; }

        [DataMember(Name = "message")]
        public string Message { get; set; }
    }
}