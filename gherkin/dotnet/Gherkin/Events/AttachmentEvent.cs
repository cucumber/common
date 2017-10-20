using System;
namespace Gherkin
{
    class AttachmentEvent : IEvent
    {
        public readonly string type = "attachment";
        public readonly SourceRef source;
        public readonly string data;
        public readonly Media media = new Media ();

        public AttachmentEvent (SourceRef source, String data)
        {
            this.source = source;
            this.data = data;
        }

        internal class SourceRef
        {
            public readonly String uri;
            public readonly Location start;

            public SourceRef (String uri, Location start)
            {
                this.uri = uri;
                this.start = start;
            }
        }

        internal class Location
        {
            public readonly int line;
            public readonly int column;

            public Location (int line, int column)
            {
                this.line = line;
                this.column = column;
            }
        }

        internal class Media
        {
            public readonly string encoding = "utf-8";
            public readonly string type = "text/x.cucumber.stacktrace+plain";
        }
    }
}
