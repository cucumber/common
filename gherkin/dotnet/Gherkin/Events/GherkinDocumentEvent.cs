using Gherkin.Ast;

namespace Gherkin
{
	public class GherkinDocumentEvent : IEvent
	{
        public readonly string type = "gherkin-document";
        public readonly GherkinDocument document;
		public readonly string uri;

        public GherkinDocumentEvent (string uri, GherkinDocument document)
		{
			this.uri = uri;
			this.document = document;
		}
	}
}