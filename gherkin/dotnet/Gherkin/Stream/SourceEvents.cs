using System;
using System.Collections;
using System.Collections.Generic;

namespace Gherkin
{
    public class SourceEvents : IEnumerable<SourceEvent>
    {
        List<string> paths;

        public SourceEvents (List<string> paths)
        {
            this.paths = paths;
        }

        public IEnumerator<SourceEvent> GetEnumerator ()
        {
            return new SourceEventEnumerator (paths);
        }

        IEnumerator IEnumerable.GetEnumerator ()
        {
            return GetEnumerator();
        }
    }

    public class SourceEventEnumerator : IEnumerator<SourceEvent>
    {
        int position = -1;
        List<string> paths;

        public SourceEventEnumerator (List<string> paths)
        {
            this.paths = paths;
        }

        public SourceEvent Current {
            get {
                string path = paths [position];
                string data = System.IO.File.ReadAllText(path);
                return new SourceEvent(path, data);
            }
        }

        object IEnumerator.Current {
            get {
                return Current;
            }
        }

        public void Dispose ()
        {
        }

        public bool MoveNext ()
        {
            position++;
            return (position < paths.Count);
        }

        public void Reset ()
        {
            position = -1;
        }
    }
}
