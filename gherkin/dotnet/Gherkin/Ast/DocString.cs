namespace Gherkin.Ast
{
    public class DocString : StepArgument, IHasLocation
    {
        public Location Location { get; private set; }
        public string ContentType { get; private set; }
        public string Content { get; private set; }
        public string Delimiter { get; private set; }

        public DocString(Location location, string contentType, string content, string delimiter = null)
        {
            Location = location;
            ContentType = contentType;
            Content = content;
            Delimiter = delimiter;
        }
    }
}