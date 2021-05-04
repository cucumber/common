using System.Runtime.Serialization;
using Gherkin.Events.Args.Ast;

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