using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Examples
    {
        public Examples()
        {
            TableBody = new List<TableBody>();
        }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "tableBody")]
        public IReadOnlyCollection<TableBody> TableBody { get; set; }

        [DataMember(Name = "tableHeader")]
        public TableHeader TableHeader { get; set; }
    }
}