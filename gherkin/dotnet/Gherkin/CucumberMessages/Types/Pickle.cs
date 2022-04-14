using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Pickle
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "language")]
        public string Language { get; set; }

        [DataMember(Name = "steps")]
        public IReadOnlyCollection<PickleStep> Steps { get; set; }

        [DataMember(Name = "tags")]
        public IReadOnlyCollection<PickleTag> Tags { get; set; }

        [DataMember(Name = "astNodeIds")]
        public IReadOnlyCollection<string> AstNodeIds { get; set; }

        public Pickle()
        {
        }
        
        public Pickle(string id, string uri, string name, string language, IEnumerable<PickleStep> steps, IEnumerable<PickleTag> tags, IEnumerable<string> astNodeIds)
        {
            Id = id;
            Uri = uri;
            Name = name;
            Language = language;
            Steps = steps.ToReadOnlyCollection();
            Tags = tags.ToReadOnlyCollection();
            AstNodeIds = astNodeIds.ToReadOnlyCollection();
        }
    }
}
