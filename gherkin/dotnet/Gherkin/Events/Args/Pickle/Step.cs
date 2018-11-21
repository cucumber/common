using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class Step
    {
        [DataMember(Name = "locations")]
        public IReadOnlyCollection<Location> Locations { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "dataTable")]
        public DataTable DataTable { get; set; }

        [DataMember(Name = "docString")]
        public DocString DocString { get; set; }
    }
}