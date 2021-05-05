using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleTag
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "astNodeId")]
        public string AstNodeId { get; set; }

        public PickleTag()
        {
        }

        public PickleTag(string name, string astNodeId)
        {
            AstNodeId = astNodeId;
            Name = name;
        }
    }
}
