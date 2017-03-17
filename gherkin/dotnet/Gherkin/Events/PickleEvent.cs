using Gherkin.Pickles;

namespace Gherkin
{
    public class PickleEvent : IEvent
    {
        public readonly string type = "pickle";
        public readonly string uri;
        public readonly Pickle pickle;

        public PickleEvent (string uri, Pickle pickle)
        {
            this.uri = uri;
            this.pickle = pickle;
        }
    }
}
