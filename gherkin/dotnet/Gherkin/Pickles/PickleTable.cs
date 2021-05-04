using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleTable
    {
        [DataMember(Name = "rows")]
        public IEnumerable<PickleRow> Rows { get; private set; }

        public PickleTable()
        {
            
        }
        
        public PickleTable(IEnumerable<PickleRow> rows)
        {
            Rows = rows;
        }
    }
}
