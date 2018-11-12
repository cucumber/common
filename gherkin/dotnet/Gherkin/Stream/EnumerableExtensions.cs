using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Gherkin.Stream
{
    public static class EnumerableExtensions
    {
        public static ReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> enumerable)
        {
            return new ReadOnlyCollection<T>(enumerable.ToList());
        }
    }
}