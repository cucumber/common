using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Attachment
{
    public class Location
    {
        public Location(int column, int line)
        {
            Column = column;
            Line = line;
        }

        public Location()
        {
        }

        [DataMember(Name = "column")]
        public int Column { get; set; }
        [DataMember(Name = "line")]
        public int Line { get; set; }
    }
}