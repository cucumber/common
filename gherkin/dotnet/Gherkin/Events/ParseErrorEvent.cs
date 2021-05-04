using System.Runtime.Serialization;
using Gherkin.Events.Args;

namespace Gherkin.Events
{
    public class ParseErrorEvent : IEvent
    {
        [DataMember(Name = "parseError")]
        public ParseErrorEventArgs EventArgs { get; set; }
    }
}
