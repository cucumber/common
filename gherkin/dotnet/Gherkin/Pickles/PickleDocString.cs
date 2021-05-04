using System.Linq;
using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleDocString
    {
        [DataMember(Name = "mediaType")]
        public string MediaType { get; private set; }

        [DataMember(Name = "content")]
        public string Content { get; private set; }
        
        public PickleDocString(string content, string mediaType = null)
        {
            Content = content;
            MediaType = mediaType;
        }
    }
}
