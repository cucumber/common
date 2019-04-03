using System.Runtime.Serialization;
using Gherkin.Events.Args.Attachment;

namespace Gherkin.Events
{
    public class AttachmentEvent : IEvent
    {
        [DataMember(Name = "attachment")]
        public AttachmentEventArgs EventArgs { get; set; }
    }
}
