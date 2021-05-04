using Gherkin.Events.Args.Pickle;
using System.Runtime.Serialization;
using Gherkin.Pickles;

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
