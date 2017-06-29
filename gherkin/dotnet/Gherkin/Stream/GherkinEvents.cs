using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.Ast;
using Gherkin.Pickles;

namespace Gherkin
{
    public class GherkinEvents
    {
        private readonly Parser parser = new Parser ();
        private readonly Compiler compiler = new Compiler();

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
                    List<Pickle> pickles = compiler.Compile(gherkinDocument);
                    foreach(Pickle pickle in pickles) {
                        events.Add(new PickleEvent(sourceEvent.uri, pickle));
                    }
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
