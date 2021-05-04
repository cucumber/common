using Gherkin.Events;
using Gherkin.Events.Args;

namespace Gherkin.Stream.Converter
{
    public class SourceEventConverter
    {
        private const string GherkinMediaType = "text/x.cucumber.gherkin+plain";

        public SourceEvent Convert(Sources sourceEvent)
        {
            return new SourceEvent()
            {
                EventArgs = new SourceEventArgs()
                {
                    Uri = sourceEvent.Uri,
                    Data = ConverterDefaults.UseDefault(sourceEvent.Data, ConverterDefaults.DefaultSourceData),
                    MediaType = GherkinMediaType
                }
            };
        }
    }
}