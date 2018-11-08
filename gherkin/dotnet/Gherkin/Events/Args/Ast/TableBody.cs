using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class TableBody
    {
        [DataMember(Name = "cells")]
        public IReadOnlyCollection<Cell> Cells { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }
}