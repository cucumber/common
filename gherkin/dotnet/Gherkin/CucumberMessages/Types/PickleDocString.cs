using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleDocString
    {
        [DataMember(Name = "mediaType")]
        public string MediaType { get; set; }

        [DataMember(Name = "content")]
        public string Content { get; set; }

        public PickleDocString()
        {
        }
        
        public PickleDocString(string content, string mediaType = null)
        {
            Content = content;
            MediaType = mediaType;
        }
    }
}
