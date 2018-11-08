using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args.Pickle
{
    public class Pickle
    {
        public Pickle()
        {
            Locations = new List<Location>();
            Steps= new List<Step>();
        }

        [DataMember(Name = "language")]
        public string Language { get; set; }


        [DataMember(Name = "locations")]
        public IReadOnlyCollection<Location> Locations { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "steps")]
        public IReadOnlyCollection<Step> Steps { get; set; }

        [DataMember(Name = "uri")]
        public string Uri { get; set; }
    }
}