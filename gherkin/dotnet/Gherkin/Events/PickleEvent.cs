using System.Runtime.Serialization;

namespace Gherkin.Events
{
    public class PickleEvent : IEvent
    {
        [DataMember(Name = "pickle")]
        public Args.Pickle.Pickle Pickle { get; set; }

        public PickleEvent (Args.Pickle.Pickle pickle)
        {
            Pickle = pickle;
        }
    }
}
