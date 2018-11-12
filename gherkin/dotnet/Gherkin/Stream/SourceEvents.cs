using System.Collections;
using System.Collections.Generic;

namespace Gherkin.Stream
{
    public class Sources
    {
        public string Uri { get; set; }
        public string Data { get; set; }
    }

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

    public class SourceEventEnumerator : IEnumerator<Sources>
    {
        int position = -1;
        List<string> paths;

        public SourceEventEnumerator (List<string> paths)
        {
            this.paths = paths;
        }

        public Sources Current {
            get {
                string path = paths [position];
                string data = System.IO.File.ReadAllText(path);
                return new Sources()
                {
                    Data = data,
                    Uri = path
                };
            }
        }

        object IEnumerator.Current => Current;

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
