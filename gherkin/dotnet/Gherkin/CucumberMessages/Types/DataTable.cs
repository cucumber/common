using System.Collections.Generic;
using System.Runtime.Serialization;
using Gherkin.Events.Args.Ast;

namespace Gherkin.CucumberMessages.Types
{
    public class DataTable
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "rows")]
        public IReadOnlyCollection<TableBody> Rows { get; set; }
    }
}