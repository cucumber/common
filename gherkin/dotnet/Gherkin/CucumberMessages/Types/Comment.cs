using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Comment
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name="text")]
        public string Text { get; set; }
    }
}