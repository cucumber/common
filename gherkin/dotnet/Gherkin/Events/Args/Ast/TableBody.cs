using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class TableBody
    {
        public TableBody()
        {
            Id = IdGenerator.GetNextId();
        }

        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "cells")]
        public IReadOnlyCollection<Cell> Cells { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }
}