using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gherkin.Pickles
{
    public class PickleRow
    {
        public IEnumerable<PickleCell> Cells { get; private set; }

        public PickleRow(IEnumerable<PickleCell> cells)
        {
            Cells = cells;
        }
    }
}
