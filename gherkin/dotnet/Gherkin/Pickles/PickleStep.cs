using System.Collections.Generic;
using System.Runtime.Serialization;
using Gherkin.Stream;

namespace Gherkin.Pickles
{
    public class PickleStep
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "astNodeIds")]
        public IReadOnlyCollection<string> AstNodeIds { get; set; }

        [DataMember(Name = "argument")]
        public PickleStepArgument Argument { get; set; }

        public PickleStep()
        {
        }
        
        public PickleStep(string id, string text, PickleStepArgument argument, IEnumerable<string> astNodeIds)
        {
            Id = id;
            Text = text;
            Argument = argument;
            AstNodeIds = astNodeIds.ToReadOnlyCollection();
        }
    }
}
