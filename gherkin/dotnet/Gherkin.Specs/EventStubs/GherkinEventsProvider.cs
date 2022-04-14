using System;
using System.Collections.Generic;
using System.IO;
using Gherkin.CucumberMessages;
using Gherkin.CucumberMessages.Pickles;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Specs.EventStubs
{
    public class GherkinEventsProvider
    {
        private readonly Parser _parser = new Parser();
        private readonly PickleCompiler _pickleCompiler;
        private readonly AstMessagesConverter _astMessagesConverter;

        readonly bool _printAst;
        readonly bool _printPickles;
        readonly bool _printSource;

        public GherkinEventsProvider(bool printSource, bool printAst, bool printPickles, IIdGenerator idGenerator)
        {
            _printSource = printSource;
            _astMessagesConverter = new AstMessagesConverter(idGenerator);
            _pickleCompiler = new PickleCompiler(idGenerator);
            _printAst = printAst;
            _printPickles = printPickles;
        }

        public IEnumerable<Envelope> GetEvents(Source source)
        {
            var events = new List<Envelope>();

            try
            {
                var gherkinDocument = _parser.Parse(new StringReader(source.Data));

                if (_printSource)
                {
                    events.Add(new Envelope
                    {
                        Source = source
                    });
                }
                if (_printAst)
                {
                    events.Add(new Envelope
                    {
                        GherkinDocument =
                            _astMessagesConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, source.Uri)
                    });
                }
                if (_printPickles)
                {
                    var pickles = _pickleCompiler.Compile(_astMessagesConverter.ConvertGherkinDocumentToEventArgs(gherkinDocument, source.Uri));
                    foreach (Pickle pickle in pickles)
                    {
                        events.Add(new Envelope
                        {
                            Pickle = pickle
                        });
                    }
                }
            }
            catch (CompositeParserException e)
            {
                foreach (ParserException error in e.Errors)
                {
                    AddParseError(events, error, source.Uri);
                }
            }
            catch (ParserException e)
            {
                AddParseError(events, e, source.Uri);
            }
            return events;
        }


        private void AddParseError(List<Envelope> events, ParserException e, String uri)
        {
            events.Add(new Envelope
            {
                ParseError = new ParseError()
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
