namespace Gherkin
{
    public class SourceEvent : IEvent
    {
        public readonly string type = "source";
        public readonly string uri;
        public readonly string data;
        public readonly Media media = new Media ();

        public SourceEvent (string uri, string data)
        {
            this.uri = uri;
            this.data = data;
        }

        public class Media
        {
            public readonly string encoding = "utf-8";
            public readonly string type = "text/vnd.cucumber.gherkin+plain";
        }
    }
}
