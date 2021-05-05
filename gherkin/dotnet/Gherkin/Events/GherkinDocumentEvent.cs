using System.Runtime.Serialization;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Events
{
	public class GherkinDocumentEvent : IEvent
	{
	    public GherkinDocumentEvent(GherkinDocument eventArgs)
	    {
	        EventArgs = eventArgs;
	    }

	    public GherkinDocumentEvent()
	    {
	    }

	    [DataMember(Name = "gherkinDocument")]
	    public GherkinDocument EventArgs { get; set; }
	}
}