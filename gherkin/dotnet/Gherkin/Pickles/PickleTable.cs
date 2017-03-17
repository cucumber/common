using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Gherkin.Pickles
{
    public class PickleTable : Argument
    {
        public IEnumerable<PickleRow> Rows { get; private set; }

        public PickleTable(IEnumerable<PickleRow> rows)
        {
            Rows = rows;
        }
        [JsonIgnoreAttribute]
        public override PickleLocation Location { get { return Rows.First().Cells.First().Location; } }
    }
}
