using System;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Envelope
    {
        [DataMember(Name = "gherkinDocument")]
        public GherkinDocument GherkinDocument { get; set; }

        [DataMember(Name = "source")]
        public Source Source { get; set; }

        [DataMember(Name = "pickle")]
        public Pickle Pickle { get; set; }

        [DataMember(Name = "parseError")]
        public ParseError ParseError { get; set; }
    }
}
