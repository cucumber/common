using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class TableRow
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "cells")]
        public IReadOnlyCollection<TableCell> Cells { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }
    }
}