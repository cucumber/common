using System.Runtime.Serialization;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Events
{
    public class PickleEvent : IEvent
    {
        [DataMember(Name = "pickle")]
        public Pickle EventArgs { get; set; }

        public PickleEvent(Pickle eventArgs)
        {
            EventArgs = eventArgs;
        }

        public PickleEvent()
        {
        }
    }
}
