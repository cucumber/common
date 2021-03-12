using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class DataTable
    {
        [DataMember(Name = "rows")]
        public IReadOnlyCollection<TableBody> Rows { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }
}