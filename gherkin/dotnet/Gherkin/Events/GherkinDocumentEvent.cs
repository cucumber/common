using System.Runtime.Serialization;
using Gherkin.Events.Args;

namespace Gherkin.Events
{
	public class GherkinDocumentEvent : IEvent
	{
	    public GherkinDocumentEvent(GherkinDocumentEventArgs eventArgs)
	    {
	        EventArgs = eventArgs;
	    }

	    public GherkinDocumentEvent()
	    {
	    }

	    [DataMember(Name = "gherkinDocument")]
	    public GherkinDocumentEventArgs EventArgs { get; set; }
	}
}