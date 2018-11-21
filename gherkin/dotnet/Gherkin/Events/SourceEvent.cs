using System.Runtime.Serialization;
using Gherkin.Events.Args.Source;

namespace Gherkin.Events
{
    public class SourceEvent : IEvent
    {
        [DataMember(Name = "source")]
        public SourceEventArgs EventArgs { get; set; }
    }
}
