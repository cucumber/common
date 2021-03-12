using System.Runtime.Serialization;

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
        public Location Location { get; set; }
        [DataMember(Name = "text")]
        public string Text { get; set; }
        [DataMember(Name = "dataTable")]
        public DataTable DataTable { get; set; }
        [DataMember(Name = "docString")]
        public DocString DocString { get; set; }
    }
}