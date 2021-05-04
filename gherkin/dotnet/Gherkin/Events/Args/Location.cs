using System.Runtime.Serialization;

namespace Gherkin.Events.Args
{
    public class Location
    {
        public Location(int column, int line)
        {
            Column = column == 0 ? (int?)null : column;
            Line = line;
        }

        public Location()
        {
        }

        [DataMember(Name = "column")]
        public int? Column { get; set; }
        [DataMember(Name = "line")]
        public int Line { get; set; }
    }
}