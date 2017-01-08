using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.Ast;

namespace Gherkin
{
    public class GherkinEvents
    {
        Parser parser = new Parser ();

        bool printAst;
        bool printPickles;
        bool printSource;

        public GherkinEvents (bool printSource, bool printAst, bool printPickles)
        {
            this.printSource = printSource;
            this.printAst = printAst;
            this.printPickles = printPickles;
        }

        public IEnumerable<IEvent> iterable (SourceEvent sourceEvent)
        {
            List<IEvent> events = new List<IEvent> ();

            try {
                GherkinDocument gherkinDocument = parser.Parse (new StringReader(sourceEvent.data));

                if (printSource) {
                    events.Add (sourceEvent);
                }
                if (printAst) {
                    events.Add (new GherkinDocumentEvent(sourceEvent.uri, gherkinDocument));
                }
                if (printPickles) {
                    throw new NotSupportedException ("Gherkin.NET doesn't have a pickle compiler yet");
                }
            } catch (CompositeParserException e) {
                foreach (ParserException error in e.Errors) {
                    addErrorAttachment (events, error, sourceEvent.uri);
                }
            } catch (ParserException e) {
                addErrorAttachment (events, e, sourceEvent.uri);
            }
            return events;
        }

        private void addErrorAttachment (List<IEvent> events, ParserException e, String uri)
        {
            events.Add (new AttachmentEvent (
                    new AttachmentEvent.SourceRef (
                            uri,
                            new AttachmentEvent.Location (
                                    e.Location.Line,
                                    e.Location.Column
                            )
                    ),
                    e.Message
            ));

        }
    }
}
