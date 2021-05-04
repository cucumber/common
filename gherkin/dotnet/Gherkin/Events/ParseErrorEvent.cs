using System.Runtime.Serialization;
using Gherkin.CucumberMessages.Types;
using Gherkin.Events.Args;

namespace Gherkin.Events
{
    public class ParseErrorEvent : IEvent
    {
        [DataMember(Name = "parseError")]
        public ParseError EventArgs { get; set; }
    }
}
