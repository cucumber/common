using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleTableRow
    {
        [DataMember(Name = "cells")]
        public IEnumerable<PickleTableCell> Cells { get; set; }

        public PickleTableRow()
        {
        }
        
        public PickleTableRow(IEnumerable<PickleTableCell> cells)
        {
            Cells = cells;
        }
    }
}
