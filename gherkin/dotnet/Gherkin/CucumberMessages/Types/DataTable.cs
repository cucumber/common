using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class DataTable
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "rows")]
        public IReadOnlyCollection<TableRow> Rows { get; set; }
    }
}