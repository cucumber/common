using Gherkin.Events;
using Gherkin.Events.Args.Source;

namespace Gherkin.Stream
{
    public class SourceEventConverter
    {
        public SourceEvent Convert(Sources sourceEvent)
        {
            return new SourceEvent()
            {
                SourceEventArgs = new SourceEventArgs()
                {
                    Uri = sourceEvent.Uri,
                    Data = sourceEvent.Data,
                    Media = new Events.Media()
                }
            };
        }
    }
}