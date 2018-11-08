using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class DataTable
    {
        public DataTable()
        {
            Rows = new List<Row>();
        }

        [DataMember(Name = "rows")]
        public IReadOnlyCollection<Row> Rows { get; set; }
    }
}