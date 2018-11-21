using Gherkin.Events;
using Gherkin.Events.Args.Source;

namespace Gherkin.Stream.Converter
{
    public class SourceEventConverter
    {
        public SourceEvent Convert(Sources sourceEvent)
        {
            return new SourceEvent()
            {
                EventArgs = new SourceEventArgs()
                {
                    Uri = sourceEvent.Uri,
                    Data = sourceEvent.Data == string.Empty ? null : sourceEvent.Data,
                    Media = new Media()
                }
            };
        }
    }
}