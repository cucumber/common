using System;
using System.Runtime.Serialization;
using Gherkin.Events.Args.Attachment;

namespace Gherkin
{
    public class AttachmentEvent : IEvent
    {
        [DataMember(Name = "attachment")]
        public AttachmentEventArgs Args { get; set; }
    }

    public class Location
    {
        public readonly int line;
        public readonly int column;

        public Location (int line, int column)
        {
            this.line = line;
            this.column = column;
        }
    }

    public class Media
    {
        public readonly string encoding = "utf-8";
        public readonly string type = "text/x.cucumber.stacktrace+plain";
    }

    public class SourceRef
    {
        public readonly String uri;
        public readonly Location start;

        public SourceRef (String uri, Location start)
        {
            this.uri = uri;
            this.start = start;
        }
    }
}
