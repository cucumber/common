using System.Runtime.Serialization;

namespace Gherkin.Events.Args
{
    public class ParseErrorEventArgs
    {
        [DataMember(Name = "message")]
        public string Message { get; set; }

        [DataMember(Name = "source")]
        public Source Source { get; set; }
    }
}