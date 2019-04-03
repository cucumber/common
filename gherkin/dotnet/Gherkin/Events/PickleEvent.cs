using Gherkin.Events.Args.Pickle;
using System.Runtime.Serialization;

namespace Gherkin.Events
{
    public class PickleEvent : IEvent
    {
        [DataMember(Name = "pickle")]
        public PickleEventArgs EventArgs { get; set; }

        public PickleEvent(PickleEventArgs eventArgs)
        {
            EventArgs = eventArgs;
        }

        public PickleEvent()
        {
        }
    }
}
