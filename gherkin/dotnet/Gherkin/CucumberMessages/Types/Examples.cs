using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Examples
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

        [DataMember(Name = "tableHeader")]
        public TableRow TableHeader { get; set; }

        [DataMember(Name = "tableBody")]
        public IReadOnlyCollection<TableRow> TableBody { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }
    }
}