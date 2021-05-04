using System.Runtime.Serialization;
using Gherkin.CucumberMessages.Types;

namespace Gherkin.Events.Args.Ast
{
    public class Step
    {
        public Step()
        {
            Id = IdGenerator.GetNextId();
        }

        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public CucumberMessages.Types.Location Location { get; set; }
        [DataMember(Name = "text")]
        public string Text { get; set; }
        [DataMember(Name = "dataTable")]
        public DataTable DataTable { get; set; }
        [DataMember(Name = "docString")]
        public DocString DocString { get; set; }
    }
}