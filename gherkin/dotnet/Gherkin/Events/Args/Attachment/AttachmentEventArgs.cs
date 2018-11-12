using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Attachment
{
    public class AttachmentEventArgs
    {
        [DataMember(Name = "data")]
        public string Data { get; set; }

        [DataMember(Name = "source")]
        public Source Source { get; set; }
    }

    public class Source
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }

    }

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