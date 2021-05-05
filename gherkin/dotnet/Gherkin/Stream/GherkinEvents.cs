using Gherkin.Events;
using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.CucumberMessages;
using Gherkin.CucumberMessages.Pickles;
using Gherkin.CucumberMessages.Types;
using Gherkin.Stream.Converter;
using GherkinDocument = Gherkin.Ast.GherkinDocument;
using Location = Gherkin.CucumberMessages.Types.Location;

namespace Gherkin.Stream
{
    public class GherkinEvents
    {
        private readonly Parser _parser = new Parser();
        private readonly PickleCompiler _pickleCompiler;
        private readonly AstMessagesConverter _astMessagesConverter;
        private readonly SourceEventConverter _sourceEventConverter = new SourceEventConverter();

        readonly bool _printAst;
        readonly bool _printPickles;
        readonly bool _printSource;

        public GherkinEvents(bool printSource, bool printAst, bool printPickles, IIdGenerator idGenerator)
        {
            _printSource = printSource;
            _astMessagesConverter = new AstMessagesConverter(idGenerator);
            _pickleCompiler = new PickleCompiler(idGenerator);
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
                    events.Add(new GherkinDocumentEvent(_astMessagesConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, sourceEvent.Uri)));
                }
                if (_printPickles)
                {
                    List<Pickle> pickles = _pickleCompiler.Compile(_astMessagesConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, sourceEvent.Uri));
                    foreach (Pickle pickle in pickles)
                    {
                        events.Add(new PickleEvent(pickle));
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
            events.Add(new ParseErrorEvent()
            {
                EventArgs = new ParseError()
                {
                    Message = e.Message,
                    Source = new SourceReference()
                    {
                        Location = new Location(e.Location.Column, e.Location.Line),
                        Uri = uri
                    }
                }
            });

        }
    }
}
