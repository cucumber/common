using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Tag
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }
    }
}