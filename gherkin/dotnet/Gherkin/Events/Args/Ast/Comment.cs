using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Comment
    {
        [DataMember(Name="text")]
        public string Text { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }
}