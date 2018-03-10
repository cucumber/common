using System.Linq;

namespace Gherkin.Pickles
{
    public class PickleString : Argument
    {
        private readonly PickleLocation location;
        public override PickleLocation Location
        {
            get { return location; }
        }

        public string Content { get; private set; }
        
        public string ContentType { get; private set; }

        public PickleString(PickleLocation location, string content, string contentType = null)
        {
            this.location = location;
            Content = content;
            ContentType = contentType;
        }
    }
}
