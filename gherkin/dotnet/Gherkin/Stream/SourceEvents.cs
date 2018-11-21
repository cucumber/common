using System.Collections;
using System.Collections.Generic;

namespace Gherkin.Stream
{
    public class SourceEvents : IEnumerable<Sources>
    {
        List<string> paths;

        public SourceEvents (List<string> paths)
        {
            this.paths = paths;
        }

        public IEnumerator<Sources> GetEnumerator ()
        {
            return new SourceEventEnumerator (paths);
        }

        IEnumerator IEnumerable.GetEnumerator ()
        {
            return GetEnumerator();
        }
    }
}
