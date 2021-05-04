using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Tag
    {
        public Tag()
        {
            Id = IdGenerator.GetNextId();
        }

        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "location")]
        public CucumberMessages.Types.Location Location { get; set; }
    }
}