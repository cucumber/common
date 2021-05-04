using System.Runtime.Serialization;

namespace Gherkin.Pickles
{
    public class PickleTag
    {
        [DataMember(Name = "name")]
        public string Name { get; private set; }

        [DataMember(Name = "astNodeId")]
        public string AstNodeId { get; private set; }

        public PickleTag(string astNodeId, string name)
        {
            AstNodeId = astNodeId;
            Name = name;
        }
    }
}
