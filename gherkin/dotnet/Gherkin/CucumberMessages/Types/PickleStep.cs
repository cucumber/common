using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.CucumberMessages.Types
{
    public class PickleStep
    {
        [DataMember(Name = "argument")]
        public PickleStepArgument Argument { get; set; }

        [DataMember(Name = "astNodeIds")]
        public IReadOnlyCollection<string> AstNodeIds { get; set; }

        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        public PickleStep()
        {
        }
        
        public PickleStep(PickleStepArgument argument, IEnumerable<string> astNodeIds, string id, string text)
        {
            Id = id;
            Text = text;
            Argument = argument;
            AstNodeIds = astNodeIds.ToReadOnlyCollection();
        }
    }
}
