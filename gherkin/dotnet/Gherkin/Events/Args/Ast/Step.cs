using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Ast
{
    public class Step
    {
        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "text")]
        public string Text { get; set; }
    }
}