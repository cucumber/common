using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleRow
    {
        [DataMember(Name = "cells")]
        public IEnumerable<PickleCell> Cells { get; private set; }

        public PickleRow()
        {
            
        }
        
        public PickleRow(IEnumerable<PickleCell> cells)
        {
            Cells = cells;
        }
    }
}
