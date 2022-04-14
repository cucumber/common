using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleTable
    {
        [DataMember(Name = "rows")]
        public IEnumerable<PickleTableRow> Rows { get; set; }

        public PickleTable()
        {
        }
        
        public PickleTable(IEnumerable<PickleTableRow> rows)
        {
            Rows = rows;
        }
    }
}
