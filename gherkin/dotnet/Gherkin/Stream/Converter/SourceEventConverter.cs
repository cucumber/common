using Gherkin.CucumberMessages;
using Gherkin.CucumberMessages.Types;
using Gherkin.Events;

namespace Gherkin.Stream.Converter
{
    public class SourceEventConverter
    {
        private const string GherkinMediaType = "text/x.cucumber.gherkin+plain";

        public SourceEvent Convert(Sources sourceEvent)
        {
            return new SourceEvent()
            {
                EventArgs = new Source()
                {
                    Uri = sourceEvent.Uri,
                    Data = CucumberMessagesDefaults.UseDefault(sourceEvent.Data, CucumberMessagesDefaults.DefaultSourceData),
                    MediaType = GherkinMediaType
                }
            };
        }
    }
}