using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Location
    {
        [DataMember(Name = "line")]
        public int Line { get; set; }

        [DataMember(Name = "column")]
        public int? Column { get; set; }

        public Location()
        {
        }

        public Location(int column, int line)
        {
            Column = column == 0 ? (int?)null : column;
            Line = line;
        }
    }
}