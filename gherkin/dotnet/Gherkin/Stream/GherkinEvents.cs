using Gherkin.Ast;
using Gherkin.Events;
using Gherkin.Pickles;
using System;
using System.Collections.Generic;
using System.IO;

namespace Gherkin.Stream
{
    public class GherkinEvents
    {
        private readonly Parser _parser = new Parser();
        private readonly Compiler _compiler = new Compiler();
        private readonly AstEventConverter _astEventConverter = new AstEventConverter();
        private readonly PickleEventConverter _pickleEventConverter = new PickleEventConverter();

        readonly bool _printAst;
        readonly bool _printPickles;
        readonly bool _printSource;

        public GherkinEvents(bool printSource, bool printAst, bool printPickles)
        {
            _printSource = printSource;
            _printAst = printAst;
            _printPickles = printPickles;
        }

        public IEnumerable<IEvent> Iterable(SourceEvent sourceEvent)
        {
            List<IEvent> events = new List<IEvent>();

            try
            {
                GherkinDocument gherkinDocument = _parser.Parse(new StringReader(sourceEvent.data));

                if (_printSource)
                {
                    events.Add(sourceEvent);
                }
                if (_printAst)
                {
                    events.Add(new GherkinDocumentEvent(_astEventConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, sourceEvent.uri)));
                }
                if (_printPickles)
                {
                    List<Pickle> pickles = _compiler.Compile(gherkinDocument);
                    foreach (Pickle pickle in pickles)
                    {
                        events.Add(new PickleEvent(_pickleEventConverter.Convert(pickle, sourceEvent.uri)));
                    }
                }
            }
            catch (CompositeParserException e)
            {
                foreach (ParserException error in e.Errors)
                {
                    addErrorAttachment(events, error, sourceEvent.uri);
                }
            }
            catch (ParserException e)
            {
                addErrorAttachment(events, e, sourceEvent.uri);
            }
            return events;
        }



        private void addErrorAttachment(List<IEvent> events, ParserException e, String uri)
        {
            events.Add(new AttachmentEvent(
                    new AttachmentEvent.SourceRef(
                            uri,
                            new AttachmentEvent.Location(
                                    e.Location.Line,
                                    e.Location.Column
                            )
                    ),
                    e.Message
            ));

        }
    }
}
