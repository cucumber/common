using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class GherkinDocumentEventArgs
    {
        public GherkinDocumentEventArgs()
        {
            Comments = new List<Comment>();
        }

        [DataMember(Name = "feature")]
        public Feature Feature { get; set; }
        [DataMember(Name = "uri")]
        public string Uri { get; set; }
        [DataMember(Name = "comments")]
        public IReadOnlyCollection<Comment> Comments { get; set; }
    }
}