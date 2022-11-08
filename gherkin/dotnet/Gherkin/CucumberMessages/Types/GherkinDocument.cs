using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class GherkinDocument
    {
        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        [DataMember(Name = "feature")]
        public Feature Feature { get; set; }

        [DataMember(Name = "comments")]
        public IReadOnlyCollection<Comment> Comments { get; set; }
    }
}