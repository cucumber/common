using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleStepArgument
    {
        [DataMember(Name = "docString")]
        public PickleDocString DocString { get; set; }

        [DataMember(Name = "dataTable")]
        public PickleTable DataTable { get; set; }
    }
}
