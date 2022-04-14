using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class Step
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "docString")]
        public DocString DocString { get; set; }

        [DataMember(Name = "dataTable")]
        public DataTable DataTable { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }
    }
}