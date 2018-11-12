using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Attachment
{
    public class AttachmentEventArgs
    {
        [DataMember(Name = "data")]
        public string Data { get; set; }

        [DataMember(Name = "source")]
        public Source Source { get; set; }
    }
}