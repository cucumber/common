using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class Row
    {
        public Row()
        {
            Cells = new List<Cell>();
        }

        [DataMember(Name = "cells")]
        public IReadOnlyCollection<Cell> Cells { get; set; }
    }
}