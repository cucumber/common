using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Rule
    {
        public Rule()
        {
            Children = new List<Children>();
            Id = IdGenerator.GetNextId();
            Tags = new List<Tag>();
        }

        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "description")]
        public string Description { get; set; }
        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "children")]
        public IReadOnlyCollection<Children> Children { get; set; }

        [DataMember(Name = "tags")]
        public IReadOnlyCollection<Tag> Tags { get; set; }
    }
}