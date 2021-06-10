using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleTableCell
    {
        [DataMember(Name = "value")]
        public string Value { get; set; }

        public PickleTableCell()
        {
        }
        
        public PickleTableCell(string value)
        {
            Value = value;
        }
    }
}
