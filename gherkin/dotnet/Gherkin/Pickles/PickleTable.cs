using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleTable : Argument
    {
        public IEnumerable<PickleRow> Rows { get; private set; }

        public PickleTable(IEnumerable<PickleRow> rows)
        {
            Rows = rows;
        }

        [IgnoreDataMember]
        public override PickleLocation Location { get { return Rows.First().Cells.First().Location; } }
    }
}
