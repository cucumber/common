using System.Collections.Generic;

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
