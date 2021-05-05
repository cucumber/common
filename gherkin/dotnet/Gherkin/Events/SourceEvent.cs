using System.Runtime.Serialization;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Events
{
    public class SourceEvent : IEvent
    {
        [DataMember(Name = "source")]
        public Source EventArgs { get; set; }
    }
}
