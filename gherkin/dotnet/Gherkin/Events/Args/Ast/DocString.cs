using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class DocString
    {
        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "delimiter")]
        public string Delimiter { get; set; }

        [DataMember(Name = "mediaType")]
        public string MediaType { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }
}