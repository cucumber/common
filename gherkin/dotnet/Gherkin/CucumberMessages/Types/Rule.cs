using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Rule
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "tags")]
        public IReadOnlyCollection<Tag> Tags { get; set; }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "children")]
        public IReadOnlyCollection<RuleChild> Children { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }
    }
}