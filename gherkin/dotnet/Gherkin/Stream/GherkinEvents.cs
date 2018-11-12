using Gherkin.Ast;
using Gherkin.Events;
using Gherkin.Pickles;
using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.Events.Args.Attachment;

namespace Gherkin.Stream
{
    public class GherkinEvents
    {
        private readonly Parser _parser = new Parser();
        private readonly Compiler _compiler = new Compiler();
        private readonly AstEventConverter _astEventConverter = new AstEventConverter();
        private readonly PickleEventConverter _pickleEventConverter = new PickleEventConverter();
        private readonly SourceEventConverter _sourceEventConverter = new SourceEventConverter();

        readonly bool _printAst;
        readonly bool _printPickles;
        readonly bool _printSource;

        public GherkinEvents(bool printSource, bool printAst, bool printPickles)
        {
            _printSource = printSource;
            _printAst = printAst;
            _printPickles = printPickles;
        }

        public IEnumerable<IEvent> Iterable(Sources sourceEvent)
        {
            List<IEvent> events = new List<IEvent>();

            try
            {
                GherkinDocument gherkinDocument = _parser.Parse(new StringReader(sourceEvent.Data));

                if (_printSource)
                {
                    events.Add(_sourceEventConverter.Convert(sourceEvent));
                }
                if (_printAst)
                {
                    events.Add(new GherkinDocumentEvent(_astEventConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, sourceEvent.Uri)));
                }
                if (_printPickles)
                {
                    List<Pickle> pickles = _compiler.Compile(gherkinDocument);
                    foreach (Pickle pickle in pickles)
                    {
                        events.Add(new PickleEvent(_pickleEventConverter.Convert(pickle, sourceEvent.Uri)));
                    }
                }
            }
            catch (CompositeParserException e)
            {
                foreach (ParserException error in e.Errors)
                {
                    addErrorAttachment(events, error, sourceEvent.Uri);
                }
            }
            catch (ParserException e)
            {
                addErrorAttachment(events, e, sourceEvent.Uri);
            }
            return events;
        }



        private void addErrorAttachment(List<IEvent> events, ParserException e, String uri)
        {
            events.Add(new AttachmentEvent()
            {
                Args = new AttachmentEventArgs()
                {
                    Data = e.Message,
                    Source = new Source()
                    {
                        Location = new Events.Args.Attachment.Location(e.Location.Column, e.Location.Line),
                        Uri = uri
                    }
                }
            });

        }
    }
}
