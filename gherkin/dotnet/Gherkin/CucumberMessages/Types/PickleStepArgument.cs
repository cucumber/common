using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleStepArgument
    {
        [DataMember(Name = "docString")]
        public PickleDocString DocString { get; set; }

        [DataMember(Name = "dataTable")]
        public PickleTable DataTable { get; set; }
    }
}
