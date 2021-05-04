using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleCell
    {
        [DataMember(Name = "value")]
        public string Value { get; private set; }

        public PickleCell(string value)
        {
            Value = value;
        }
    }
}
